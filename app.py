from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from langchain_community.retrievers import AzureCognitiveSearchRetriever
from langchain.chains import RetrievalQA
from langchain_community.llms import OpenAI
from langchain.memory import ConversationBufferMemory
import openai

# Load environment variables and setup API key
load_dotenv()
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

# Initialize the memory, model, and retriever
memory = ConversationBufferMemory(return_messages=True)
llm = OpenAI()  # Assuming OpenAI class supports using conversation context
retriever = AzureCognitiveSearchRetriever(content_key="content", top_k=5)
qa_chain = RetrievalQA.from_llm(llm=llm, retriever=retriever,verbose=True,
    memory=memory)
qa_chain_patient=RetrievalQA.from_llm(llm=llm, retriever=retriever)
app = Flask(__name__)
chatbot_context = "I am an assistive conversational chatbot here to help doctors find answers from the database. If I don't know the answer, I will ask more questions that help me find related answers."
@app.route('/chat', methods=['POST'])
def chat():
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
    query_for_patient_info = f"Find all patient record for identifier: {insuranceNumber} & {name}"
    
    # Use the qa_chain or a similar retrieval mechanism to fetch patient information
    
    patient_info_result = qa_chain_patient.invoke({"query": query_for_patient_info})
    print(patient_info_result)
    # # Assuming the result contains the patient information in a structured format
    # # You may need to parse or process this result to extract the patient information
    patient_info = patient_info_result.get("result", {})
    print(patient_info)
    # # Check if patient_info is directly usable or if further processing is needed
    # # This step is highly dependent on the format of your patient_info_result
    
   
    prompt = f"Create a concise medical summary for the following patient data from the start of his first visit to doctor give focussed points for diagnosis, allergies, medications and everything else necessary for doctor to treat the patient and in the end give one summary of the patient:\n{patient_info}"
    
    # # Query the OpenAI model to generate a summary
    summary_result =qa_chain_patient.invoke({"query":prompt}) 
    summary = summary_result.get("result", "Unable to generate summary.")
    print(summary)
    return jsonify({'summary': summary})


if __name__ == '__main__':
    app.run(debug=True)
