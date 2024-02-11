from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from langchain_community.retrievers import AzureCognitiveSearchRetriever
from langchain.chains import RetrievalQA
from langchain_community.llms import OpenAI
from langchain.memory import ConversationBufferWindowMemory 
import openai
from flask_cors import CORS  # Import CORS module

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# Load environment variables and setup API key
load_dotenv()
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

# Initialize the memory, model, and retriever
memory = ConversationBufferWindowMemory(k=4)
llm = OpenAI(max_tokens=1024) 
llm2 = OpenAI(max_tokens=1024) 
 # Assuming OpenAI class supports using conversation context
# retriever = AzureCognitiveSearchRetriever(content_key="content", top_k=5)
chat_retriever = AzureCognitiveSearchRetriever(
    service_name=os.getenv('AZURE_COGNITIVE_SEARCH_SERVICE_NAME'),
    index_name=os.getenv('AZURE_CHAT_COGNITIVE_SEARCH_INDEX_NAME'),
    api_key=os.getenv('AZURE_COGNITIVE_SEARCH_API_KEY'),
    content_key="content",  # Replace with the field you want to retrieve from your index
    top_k=6
)
patient_info_retriever = AzureCognitiveSearchRetriever(
    service_name=os.getenv('AZURE_COGNITIVE_SEARCH_SERVICE_NAME'),
    index_name=os.getenv('AZURE_COGNITIVE_SEARCH_INDEX_NAME'),
    api_key=os.getenv('AZURE_COGNITIVE_SEARCH_API_KEY'),
    content_key="content",  # Replace with the field you want to retrieve from your index
    top_k=6
)
qa_chain = RetrievalQA.from_llm(llm=llm, retriever=chat_retriever,verbose=True,
    memory=memory)
qa_chain_patient=RetrievalQA.from_llm(llm=llm2, retriever=patient_info_retriever)



chatbot_context = """I am an assistive conversational chatbot here to help Doctor's Treatment Recommendation

A patient's data points have been provided for consideration:

- *Age*
- *Gender*
- *Histology*
- *Chronic Disease*
- *Medications*
- *Tumour Stage Numerical*

Given these data points, the doctor seeks the best method of treatment, including the *Surgery Type. The recommendation should be based not only on the **Survival Rate* associated with each treatment method but also on the similarity in values of the provided data points.

For a comprehensive recommendation, the model should identify cases with similar values for the provided data points and select the treatment option with the highest associated survival rate among those cases.

If necessary, the model can request additional data such as:

- *Protein1*
- *Protein2*
- *Protein3*
- *Protein4*
- *ER Status*
- *PR Status*
- *HER2 Status*

These additional data points can further refine the treatment recommendation by identifying cases with similar biological profiles and treatment outcomes.

Context for Chatbot: You are tasked with providing treatment recommendations to a doctor based on a patient's data. The recommendation should prioritize treatment methods with higher survival rates among cases with similar values for the provided data points."""



@app.route('/chat', methods=['POST'])
def chat():
    print('Hi')
    print(request.json)
    user_message = request.json.get('message')
    print(f"Received message: {user_message}")  # Log received message

    # Save user message to memory. Assume this is done correctly elsewhere or adjust as needed.
      # Placeholder for saving context

    # Load conversation context
    conversation_context = memory.load_memory_variables({})
    print(f"Loaded conversation context: {conversation_context}")  # Log the loaded conversation history
    formatted_prompt = f"{chatbot_context}\n{conversation_context['history']}\nUser: {user_message}\nAI:"
    
    # Proceed with generating a response using the combined context
    result = qa_chain.invoke({"query": formatted_prompt})
    # Proceed with generating a response using the conversation context
    print(result)
    chat_response = result.get("result", "I'm not sure how to answer that.")
    print(f"Chat response: {chat_response}")  # Log the processed chat response
    
    # Update conversation context with the new response
    # Placeholder for updating context; adjust as needed
    memory.save_context({"input": user_message}, {"output": chat_response})

    return jsonify({'message': chat_response})

@app.route('/fetch_patient_info', methods=['POST'])
def fetch_patient_info():
    patient_data = request.json
    print(patient_data)
    insuranceNumber = patient_data.get('insuranceNumber') or patient_data.get('ssn')
    name=patient_data.get('name')
    # Assuming the unique_identifier can be used directly to query your vector database
    # Here, you might need to adjust the query format based on how your data is structured
    query_for_patient_info = f"Search and provide latest 5 patient records corresponding to the insurance number: {insuranceNumber}. If no records are found for this insurance number, indicate that the patient is not present in the database."
    
    # Use the qa_chain or a similar retrieval mechanism to fetch patient information
    
    patient_info_result = qa_chain_patient.invoke({"query": query_for_patient_info})
    print(patient_info_result)
    # # Assuming the result contains the patient information in a structured format
    # # You may need to parse or process this result to extract the patient information
    patient_info = patient_info_result.get("result", {})
    print(patient_info)
    # # Check if patient_info is directly usable or if further processing is needed
    # # This step is highly dependent on the format of your patient_info_result
    
   
    prompt = f"Create a concise medical summary in a paragraph for the following patient data from the start of his first visit to doctor give focussed points for diagnosis, allergies, medications and everything else necessary for doctor to treat the patient\n{patient_info}"
    
    # # Query the OpenAI model to generate a summary
    summary_result =qa_chain_patient.invoke({"query":prompt}) 
    print(summary_result)
    summary = summary_result.get("result", "Unable to generate summary.")
    print(summary)
    return jsonify({'summary': summary})

# @app.route('/fetch_visit_dates', methods=['POST'])
# def fetch_visit_dates():
#     patient_data = request.json
#     insuranceNumber = patient_data.get('insuranceNumber') or patient_data.get('ssn')

#     # Craft a query that specifically asks for visit dates associated with the insurance number
#     query_for_visit_dates = f"Retrieve 5 records for the patient with insurance number: {insuranceNumber} in increasing visit dates and return date, title and medication in this format {{date:,title:,medication: }} only"
#     print(query_for_visit_dates)
#     # Invoke the retrieval chain to execute the query
#     visit_dates_result = qa_chain_patient.invoke({"query": query_for_visit_dates})
#     print(visit_dates_result)
#     # Extract and process the visit dates from the response
#     visit_dates = visit_dates_result.get("result", "No visit dates found or unable to retrieve visit dates.")
    
#     # Return the visit dates as part of the response
#     return jsonify({'visit_dates': visit_dates})


if __name__ == '__main__':
    app.run(debug=True)
