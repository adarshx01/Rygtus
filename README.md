
# Define 3.0
The official template repository for Define 3.0

![DefineHack 2025 Logo](https://github.com/user-attachments/assets/8173bc16-418e-4912-b500-c6427e4ba4b6)


TEAM RYGTUS
# < AyuCare >
 Cover Image  If applicable

### Team Information
- **Team Name**: <Team RYGTUS> 
- **Track**: < AI in AYUSH >

### Team Members
| Name | Role | GitHub | LinkedIn |
|------|------|--------|----------|
| [Sajad Hussain] | [Research & Design] | [@username](https://github.com/alysajad) | [Profile](www.linkedin.com/in/sajad-hussain-malla-983854274) |
| [Abinash Singh] | [Machine Learning + AI model training] | [@username](https://github.com/avinashlalotra) | [Profile](https://www.linkedin.com/in/abinashsinghlalotra/?originalSubdomain=in) |
| [Adarsh vishwakarma] | [App dev backend + integrations] | [@username](https://github.com/adarshx01) | [Profile](https://www.linkedin.com/in/adarshx95/) |
| [Barash Sharma] | [Front end app dev + Research] | [@username](https://github.com/barash1311) | [Profile](https://www.linkedin.com/in/barash-sharma/?originalSubdomain=in) |

## Project Details

### Overview
AyuCare is an assitive diagonistic tool for the Ayurvedic Physicians which adds the power of AI to the ancient wisdom.it provides an instant feedback on On AYUSH parikshas Like (Nadi pariksha,Netra Pariksha and jeeva-Pariksha),and assistive chatbot and the herb plant recognition mobile app.

### Problem Statement

In India, over 355 million women face gynecological health issues, yet many do not receive timely diagnosis and care due to limited access to specialized healthcare, social stigma, and a lack of awareness about their conditions. According to the National Family Health Survey (NFHS-5), nearly 60% of Indian women suffer from reproductive health concerns, including PCOS, endometriosis, and menstrual disorders, often remaining undiagnosed for years. Additionally, Ayurvedic practitioners, who form a key pillar of India’s AYUSH healthcare system, rely on dosha-based assessments and tongue diagnostics, which currently lack AI-driven analytical support for accurate, large-scale evaluations.
Ayucare is an AI-powered Ayurvedic health assistant designed to bridge this gap by enabling personalized dosha assessments, AI-assisted tongue analysis, and structured symptom-based questioning to help women understand their gynecological health. The platform empowers both patients and AYUSH practitioners by collecting and storing structured health data, offering non-medication-based wellness recommendations such as diet, lifestyle, and yoga, and providing remote patient monitoring through a dedicated doctor’s dashboard. Additionally, Ayucare integrates computer vision-based herbal medicine identification, enhancing diagnostic accuracy and treatment efficacy.
By leveraging AI and computer vision, Ayucare aligns with Mission AYUSH, providing a data-driven, scalable solution that promotes early detection, enhances doctor-patient engagement, and modernizes holistic healthcare practices for improved women’s reproductive health
### Solution
Ayucare is an AI-powered healthcare platform that blends Ayurveda and modern AI technologies to offer personalized health assessments for both patients and doctors. The system integrates dosha-based diagnostics, symptom evaluation, AI-driven insights, and herbal medicine identification to enhance holistic healthcare accessibility.

User-Centric Workflow:
Users sign up and select their role as doctor or patient.
Patients answer a structured set of questions to determine their Dosha (body constitution) based on Ayurvedic principles.
Based on the identified Dosha, the patient undergoes a detailed symptom analysis to detect potential health concerns.
AI-Powered Personalized Recommendations:
A personalized chatbot provides non-medication-based solutions such as dietary recommendations, lifestyle modifications, and holistic wellness practices rooted in AYUSH methodologies.
Doctor’s Dashboard & AI-Assisted Diagnosis:
Doctors gain access to a dashboard with patient data, customizable health questionnaires, and AI-generated insights.
AI-driven tongue image analysis helps doctors diagnose conditions based on visual health indicators, cross-referencing with the patient's symptom responses for enhanced decision-making.
AI-Assisted Herbal Medicine Identification:
A computer vision model identifies medicinal herbs, assisting both patients and practitioners in understanding their properties and uses.
The system enhances accuracy by integrating user-inputted sensory details (smell, texture, dryness, etc.), ensuring precise recommendations for herbal remedies.
Doctors can validate AI-generated herb identifications, allowing the model to learn and improve over time.
By combining AI, Ayurvedic principles, and holistic health methodologies, Ayucare makes personalized, preventive, and traditional healthcare more accessible, while empowering doctors with AI-assisted insights for better treatment decisions.**

### Demo
[![Project Demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
_Replace VIDEO_ID with your YouTube video ID or provide an alternative demo link_

### Live Project
Built apk running on local mobile device

## Technical Implementation

### Technologies Used
- **Frontend**: [React native]
- **Backend**: [Python,Flask]
- **Database**: [Firebase,Vector DB]
- **APIs**: [Gemini]
- **Other Tools**: [Google colab,Roboflow]

### Key Features
1-AI-Based Dosha Analysis – Users answer a series of questions to determine their Ayurvedic body constitution (Dosha) and receive tailored health insights.
2-Symptom-Based Health Assessment – Patients provide symptom details, which are analyzed using AI-powered diagnostics to predict potential health concerns.
3-Personalized AI Chatbot – Offers dietary recommendations, lifestyle changes, and holistic wellness practices based on AYUSH methodologies.
4-Doctor’s Dashboard – Provides patient data access, customizable questionnaires, and AI-generated insights to support remote consultations and decision-making.
5-AI-Powered Tongue Analysis – Uses computer vision to analyze tongue images and correlate findings with dosha imbalances and health conditions.
6-Herbal Medicine Identification – A computer vision model recognizes medicinal herbs, cross-validating with user inputs (smell, texture, etc.) for precise herbal remedy suggestions.
7-Continuous AI Learning – Doctors validate AI-generated diagnoses and herb identifications, improving the model over time through real-world feedback integration.

## Setup Instructions

### Prerequisites
1 React Native Environment – Node.js, Expo, or React Native CLI for cross-platform development.
2. Backend & Database – Firebase for authentication and real-time data storage, along with PostgreSQL or MongoDB for structured data management.
3. AI & Machine Learning – TensorFlow or PyTorch for training models, OpenCV for image processing, and cloud GPU services (Google Colab, AWS, or Azure) for deep learning.
4. Computer Vision – Pre-trained segmentation models for tongue analysis and herb identification, fine-tuned with manually annotated datasets.
5. Chatbot & NLP – Google Dialogflow or OpenAI GPT-based models for interactive chatbot responses tailored to AYUSH principles.
6. APIs & Integrations – Speech-to-text services, image recognition APIs, and cloud storage for patient records.

### Installation 
# Clone the repository
git clone https://github.com/your-repo/ayucare.git
cd ayucare

# Install dependencies
npm install  # or yarn install

# Setup Firebase
# Configure your Firebase credentials in a .env file

# Start the development server
npx expo start  # For Expo
# OR
npx react-native run-android  # For Android
npx react-native run-ios  # For iOS

### Running the Project
# Start the development server
npx expo start  # For Expo (Recommended for React Native development)

# OR for running on a specific platform
npx react-native run-android  # Run on an Android emulator or device
npx react-native run-ios  # Run on an iOS simulator or device (Mac only)

# If using a backend server (e.g., Node.js, Firebase functions)
cd backend
npm start  # Start the backend server

## Additional Resources

### Project Timeline
Hour 1-4: Research and Structuring the Workflow
Since the project revolves around healthcare and Ayurveda, the initial four hours are dedicated to extensive research. The team studies AYUSH methodologies, dosha-based health assessment techniques, and symptom-based diagnosis models. Additionally, we refine the workflow of the application, ensuring that each step—from patient registration to doctor analysis—is structured logically. This phase helps in formulating accurate questionnaires and determining the AI chatbot’s knowledge base.

Hour 5-7: Initial Setup and Authentication
With the research complete, the development process begins with setting up the React Native environment. Firebase authentication is integrated to allow secure login and role selection (doctor/patient). A basic UI layout for the onboarding screens and dashboard is created, ensuring a smooth user experience. The database schema is also planned during this phase.

Hour 8-11: Dosha Assessment and Symptom Questionnaire
The patient-side functionality is built, starting with a questionnaire to determine the user's dosha based on Ayurvedic principles. Once the dosha type is identified, the system moves to symptom assessment, collecting detailed patient health data. The responses are stored in the database, ensuring doctors can retrieve and analyze the data later.

Hour 12-15: Doctor’s Dashboard and AI Chatbot Development
The doctor’s dashboard is implemented, allowing practitioners to view patient history, assessment results, and customize questionnaires for improved diagnosis. Simultaneously, the AI chatbot is developed and fine-tuned on AYUSH texts to provide non-medical recommendations such as dietary guidelines, lifestyle adjustments, and herbal remedies based on the patient's condition.

Hour 16-18: Tongue Image Analysis AI Model
A computer vision model is integrated to analyze tongue imagery, extracting insights based on color, texture, and patterns. This data is cross-referenced with patient questionnaire responses, helping doctors make more precise health assessments.

Hour 19-21: Herbal Medicine Identification System
The herb identification module is developed, combining computer vision and user input (such as color, texture, and smell) to recognize medicinal herbs. The system provides detailed information on herb usage while allowing doctors to validate AI-generated suggestions, ensuring continuous learning and accuracy improvement.

Hour 22-24: Testing, Debugging, and Final Enhancements
The last phase is dedicated to rigorous testing and debugging to ensure smooth performance. UI/UX refinements are made, chatbot responses are reviewed for accuracy, and security measures are verified to protect sensitive patient data. The final adjustments ensure that all features function seamlessly, preparing the project for a final presentation and demonstration.

### Challenges Faced
1. Gathering and Annotating a Tongue Image Dataset
One of the most difficult tasks was acquiring a relevant dataset for tongue image analysis. Most of the publicly available datasets were in Chinese and lacked proper conversion tools, making them unusable for our model. Since no readily available datasets matched our requirements, we had to manually annotate images to classify tongue features based on Ayurvedic principles. This process was both time-consuming and tedious, but it was necessary to ensure our AI model could make meaningful predictions.
2. Ensuring Medical Accuracy in Dosha and Symptom Analysis
Since our project involved healthcare and Ayurveda, we needed reliable dosha assessment methods. The challenge was structuring the questionnaire in a way that was both scientifically sound and user-friendly. To overcome this, we dedicated the first four hours entirely to research, cross-referencing AYUSH resources and Ayurveda texts to refine our approach.
3. Implementing Secure and Scalable Data Management
Handling sensitive health data required a robust and secure database structure. The challenge was ensuring efficient access control so that patients could only view their own data, while doctors had broader access. We implemented role-based access control (RBAC) using Firebase, ensuring privacy and security while maintaining smooth functionality.
4. Developing an AI Chatbot for Personalized Health Advice
Creating an AI-driven chatbot that could provide dosha-based recommendations was complex because it required personalized, relevant, and medically sound responses. Since training a model from scratch was impractical in a 24-hour timeframe, we used pre-trained NLP models and fine-tuned prompt engineering techniques to make the chatbot interact in a context-aware manner.
5. Overcoming UI/UX Challenges for a Smooth User Experience
Designing a feature-rich yet intuitive UI was tricky. Our initial layout was too complex, making it difficult for users to navigate between dosha assessments, chatbot interactions, and doctor consultations. We simplified the UI using step-by-step guided workflows, ensuring that users could complete tasks one at a time without confusion.
6. Limited Time for Testing and Debugging
Since our platform dealt with health recommendations, accuracy was crucial. However, due to the 24-hour time constraint, full-scale testing was impossible. We used real-time debugging tools, automated UI testing, and a prioritized approach, ensuring that critical functionalities were tested first.

Despite these challenges, we successfully built Ayucare(a basic MVP), an AI-powered Ayurvedic health assistant, within the given timeframe. 🚀

### Future Enhancements
As Ayucare continues to evolve, several improvements and expansions are planned to enhance its effectiveness and usability. One of the primary areas of focus is expanding the tongue image dataset, as the current dataset required manual annotation due to the lack of readily available resources. To improve accuracy, we aim to collect high-quality tongue images from diverse demographics, automate the annotation process using AI-assisted tools, and fine-tune our deep learning model for more precise Ayurvedic health assessments. Another major enhancement is the integration of real-time consultations with certified Ayurvedic practitioners, allowing users to connect directly with experts for personalized health advice, live chat or video consultations, and follow-up treatment recommendations.
Additionally, the chatbot, which currently provides dosha-based recommendations, will be further developed to support more intelligent interactions by incorporating a wider Ayurvedic knowledge base, enabling voice-assisted responses, and improving multilingual support to cater to a broader audience. To increase accessibility, we plan to develop a dedicated mobile application for both Android and iOS, incorporating offline capabilities to assist users in remote areas with limited internet access. Furthermore, given the sensitivity of health-related data, we aim to integrate blockchain technology for secure, tamper-proof health records, ensuring decentralized storage and greater privacy control for users.
Beyond diagnostics, Ayucare will expand its features to include Ayurveda-based lifestyle and diet recommendations, offering personalized meal plans, guided meditation, and daily habit tracking to help users maintain a balanced and holistic lifestyle. With these enhancements, Ayucare will transform into a comprehensive AI-powered Ayurvedic healthcare ecosystem, seamlessly integrating modern technology with traditional wisdom to empower users in managing their health effectively.

### Submission Checklist
- [YES ] Completed all sections of this README
- [ YES] Added project demo video
- [YES ] Provided live project link(locale app)
- [ YES] Ensured all team members are listed
- [ YES] Included setup instructions
- [ YES] Submitted final code to repository

---

© Define 3.0 | [Define 3.0](https://www.define3.xyz/)
