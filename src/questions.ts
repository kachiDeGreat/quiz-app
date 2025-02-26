import { v4 as uuidv4 } from "uuid";

// Define the structure of a question
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

// Question bank with answers
export const questionBank: Question[] = [
  // Existing questions (1-20)
  {
    id: uuidv4(),
    text: "The history of nursing informatics dates back to the 1850s with the work of which pioneer nurse?",
    options: [
      "Lydia Hall",
      "Virginia Henderson",
      "Florence Nightingale",
      "Betty Neuman",
    ],
    correctAnswer: "Florence Nightingale",
  },
  {
    id: uuidv4(),
    text: "Formal definition of nursing informatics as a specialty practice by ANA occurred in?",
    options: ["1980s", "1992", "1995", "Post 2000"],
    correctAnswer: "1992",
  },
  {
    id: uuidv4(),
    text: "Source data capture implies?",
    options: [
      "Capturing data with a computer",
      "Capturing data where it originates",
      "Obtaining patient data from significant others",
    ],
    correctAnswer: "Capturing data where it originates",
  },
  {
    id: uuidv4(),
    text: "The concept of computer terminal by the bedside was introduced?",
    options: ["In the 1980s", "Early 1970s", "In the 1990s"],
    correctAnswer: "In the 1980s",
  },
  {
    id: uuidv4(),
    text: "One amongst these is NOT an advantage of source data capture?",
    options: [
      "Reduce much of the clerical workload",
      "Improve patient health status",
      "Improve access to clerical data",
    ],
    correctAnswer: "Improve patient health status",
  },
  {
    id: uuidv4(),
    text: "One of these is an example of Source data capture?",
    options: [
      "Telemetry",
      "Mercury blood pressure apparatus",
      "Digital blood pressure apparatus",
      "CT scan",
    ],
    correctAnswer: "Telemetry",
  },
  {
    id: uuidv4(),
    text: "One amongst these is NOT a criterion for source data capture technology?",
    options: [
      "The technology must be rugged and durable",
      "Such technology must be small and compact",
      "It must have the capacity to interact with existing hospital information system",
      "It must have a voice input and output",
    ],
    correctAnswer: "It must have a voice input and output",
  },
  {
    id: uuidv4(),
    text: "--------------- is a computer-based system that provides advice to clinicians?",
    options: [
      "Point of care",
      "Source data capture",
      "Telemetry",
      "Decision Support Systems",
    ],
    correctAnswer: "Decision Support Systems",
  },
  {
    id: uuidv4(),
    text: "--------- is a broadest time that implies the use of healthcare and health education services using information technology?",
    options: ["Telehealth", "Tele-medicine", "Tele- nursing"],
    correctAnswer: "Telehealth",
  },
  {
    id: uuidv4(),
    text: "The responsibility of tele-nurses include all EXCEPT?",
    options: [
      "Remote patient monitoring",
      "Collaborating with the healthcare team",
      "Prescribing medications",
      "Communicating with patients and families",
    ],
    correctAnswer: "Prescribing medications",
  },
  {
    id: uuidv4(),
    text: "Which one of these is not a major component of nursing informatics?",
    options: ["Data", "Information", "Documentation", "Knowledge"],
    correctAnswer: "Documentation",
  },
  {
    id: uuidv4(),
    text: "Discrete entities that are described objectively without interpretation are known as?",
    options: ["Patients", "Data", "Information", "Client History"],
    correctAnswer: "Data",
  },
  {
    id: uuidv4(),
    text: "Information that is synthesized so that relationships are identified is known as?",
    options: [
      "Knowledge",
      "Clients’ biodata",
      "Computer science",
      "Information",
    ],
    correctAnswer: "Knowledge",
  },
  {
    id: uuidv4(),
    text: "Nursing informatics is combination of ALL except?",
    options: [
      "Computer science",
      "Information science",
      "Nursing science",
      "Informatics science",
    ],
    correctAnswer: "Informatics science",
  },
  {
    id: uuidv4(),
    text: "------------ is described as data that are interpreted, organized, or structured?",
    options: ["Information", "Nursing science", "Computer science", "Data"],
    correctAnswer: "Information",
  },
  {
    id: uuidv4(),
    text: "The under listed are the challenges of nursing informatics application EXCEPT?",
    options: [
      "Regular system failures",
      "Legal Issues in Nursing Informatics",
      "Resistant to change among some nurses",
      "Lack of appropriate curriculum content",
    ],
    correctAnswer: "Lack of appropriate curriculum content",
  },
  {
    id: uuidv4(),
    text: "An informatics nurse should have all these qualities Except one?",
    options: [
      "Technologically Proficient",
      "Good communicator",
      "Good researcher",
      "Be organized",
    ],
    correctAnswer: "Good researcher",
  },
  {
    id: uuidv4(),
    text: "Which of these is NOT an example of a medical input and output device?",
    options: [
      "Heart monitor",
      "Electronic suction machine",
      "Volumetric pumps",
      "Medical resonance imaging (MRI)",
    ],
    correctAnswer: "Electronic suction machine",
  },
  {
    id: uuidv4(),
    text: "One of these is an example of an input device used in monitoring patient health status?",
    options: ["Stethoscope", "Penile sheath", "Oximeter", "Ambu bag"],
    correctAnswer: "Oximeter",
  },
  {
    id: uuidv4(),
    text: "Which of the Nursing informatics model is similar to Abraham Maslow theory of needs?",
    options: [
      "Schiwirian’s Model",
      "Graves and Corcoran model",
      "Berner’s Model",
      "Turley’s Model",
    ],
    correctAnswer: "Schiwirian’s Model",
  },

  // New questions (21-55)
  {
    id: uuidv4(),
    text: "What is the full meaning of QSEN?",
    options: [
      "Quality student education for nurses",
      "Quality and school education network",
      "Quality and safety education for network",
      "Quality and safety education for nurses",
    ],
    correctAnswer: "Quality and safety education for nurses",
  },
  {
    id: uuidv4(),
    text: "What country is the web suffix .il for?",
    options: ["India", "Ireland", "Rhodes Island", "Israel"],
    correctAnswer: "Israel",
  },
  {
    id: uuidv4(),
    text: "The meaningful use criteria, objectives and measures will evolve in ______ stages",
    options: ["1", "4", "6", "3"],
    correctAnswer: "3",
  },
  {
    id: uuidv4(),
    text: "QSEN is associated with __________ competencies",
    options: ["2", "3", "5", "6"],
    correctAnswer: "6",
  },
  {
    id: uuidv4(),
    text: "One of the following is not the core role of informatics in nursing",
    options: [
      "Concept representation and standards to support evidence-based practice, research and education",
      "Data and communication standards to build an interoperable national data infrastructure",
      "Research methodologies to disseminate new knowledge into practice",
      "Providing safety of staffs and patients",
    ],
    correctAnswer: "Providing safety of staffs and patients",
  },
  {
    id: uuidv4(),
    text: "Nursing informatics was created by the merger of three well-established scientific fields except?",
    options: [
      "Information science",
      "Computer science",
      "Nursing science",
      "Knowledge",
    ],
    correctAnswer: "Knowledge",
  },
  {
    id: uuidv4(),
    text: "Network fall into _____ levels",
    options: ["8", "6", "4", "3"],
    correctAnswer: "3",
  },
  {
    id: uuidv4(),
    text: "All of the following except one influence how high on the list of hits a page is listed",
    options: [
      "How often your search terms are on the Web page",
      "Where they are located on the page",
      "How many other Web pages link to the page",
      "The network provider",
    ],
    correctAnswer: "The network provider",
  },
  {
    id: uuidv4(),
    text: "A situation where a person pretends to be trustworthy through the web is called?",
    options: ["Malware", "Malicious software", "Spyware", "Phishing"],
    correctAnswer: "Phishing",
  },
  {
    id: uuidv4(),
    text: "____ in a computer controls access between networks",
    options: ["Internet", "Antivirus", "Security suites", "Firewall"],
    correctAnswer: "Firewall",
  },
  {
    id: uuidv4(),
    text: "_____ is known as the network of networks",
    options: ["Computer", "World Wide Web", "Internet protocol", "Internet"],
    correctAnswer: "Internet",
  },
  {
    id: uuidv4(),
    text: "____ is an interdisciplinary and international quarterly. It provides a common forum for representatives of anthropology, sociology, history, social psychology, political science, human geography, biology, economics, communications science and other disciplines",
    options: [
      "Social behaviour",
      "Social structure",
      "Sociolinguistics",
      "Social networks",
    ],
    correctAnswer: "Social networks",
  },
  {
    id: uuidv4(),
    text: "The first anti-virus offered for sale in 2003 is?",
    options: ["Macfree", "McAfree", "Kapasky", "Kaspersky"],
    correctAnswer: "Kaspersky",
  },
  {
    id: uuidv4(),
    text: "FTP means",
    options: [
      "File Transport Pathway",
      "File Transfer Protocol",
      "Failed Transport Pathway",
      "File Transport Protocol",
    ],
    correctAnswer: "File Transfer Protocol",
  },
  {
    id: uuidv4(),
    text: "Internet Relay Chat ensures that------",
    options: [
      "Users are identified",
      "Users have access to chats",
      "Hacking is prevented",
      "Users chat in real-time",
    ],
    correctAnswer: "Users chat in real-time",
  },
  {
    id: uuidv4(),
    text: "When using email, the computer acts as a post office.",
    options: ["True", "False", "I do not know", "I am not sure"],
    correctAnswer: "True",
  },
  {
    id: uuidv4(),
    text: "HTTP means_____",
    options: [
      "Hypertext transfer protocol",
      "Hypotext transfer protocol",
      "Hypertextual transfer protocol",
      "Hypertext transferred protocol",
    ],
    correctAnswer: "Hypertext transfer protocol",
  },
  {
    id: uuidv4(),
    text: "HTTPS means ______",
    options: [
      "Hypertext transfer protocol secured",
      "Hypotext transfer protocol secured",
      "Hypertextual transfer protocol secured",
      "Hypertext transferred protocol secured",
    ],
    correctAnswer: "Hypertext transfer protocol secured",
  },
  {
    id: uuidv4(),
    text: "The website suffix ending in .ca means",
    options: ["Cambodia", "Cameron", "Canada", "Chad"],
    correctAnswer: "Canada",
  },
  {
    id: uuidv4(),
    text: "The website suffix ending in .co.uk means",
    options: ["Ukraine", "United Kingdom", "United Arab Emirates", "Uganda"],
    correctAnswer: "United Kingdom",
  },
  {
    id: uuidv4(),
    text: "A BOTNET is",
    options: [
      "Program that can replicate itself throughout a computer network.",
      "Programs that can replicate their structures or effects by infecting other files or structures on a computer.",
      "A network of zombie computers that have been taken over by a robot.",
      "Scam software with malicious payloads, usually of limited or no benefit, that are sold to consumers via certain unethical marketing practices.",
    ],
    correctAnswer:
      "A network of zombie computers that have been taken over by a robot.",
  },
  {
    id: uuidv4(),
    text: "Computer Viruses are",
    options: [
      "Programs that can replicate itself throughout a computer network.",
      "Programs that can replicate their structures or effects by infecting other files or structures on a computer.",
      "A network of zombie computers that have been taken over by a robot.",
      "Scam software with malicious payloads, usually of limited or no benefit, that are sold to consumers via certain unethical marketing practices.",
    ],
    correctAnswer:
      "Programs that can replicate their structures or effects by infecting other files or structures on a computer.",
  },
  {
    id: uuidv4(),
    text: "Computer worms are",
    options: [
      "Programs that can replicate itself throughout a computer network.",
      "Programs that can replicate their structures or effects by infecting other files or structures on a computer.",
      "A network of zombie computers that have been taken over by a robot.",
      "Scam software with malicious payloads, usually of limited or no benefit, that are sold to consumers via certain unethical marketing practices.",
    ],
    correctAnswer:
      "Programs that can replicate itself throughout a computer network.",
  },
  {
    id: uuidv4(),
    text: "____ is a type of malware which restricts access to the computer system that it infects, and demands a ransom paid to the creator(s) of the malware for the restriction to be removed.",
    options: ["Malware", "Scareware", "Ransomware", "Spyware"],
    correctAnswer: "Ransomware",
  },
  {
    id: uuidv4(),
    text: "___ is defined by its malicious intent, acting against the requirements of the computer user",
    options: ["Malware", "Scareware", "Ransomware", "Spyware"],
    correctAnswer: "Malware",
  },
  {
    id: uuidv4(),
    text: "___ are programs that surreptitiously monitor activity on a computer system and report that information to others without the user's consent.",
    options: ["Malware", "Scareware", "Ransomware", "Spyware"],
    correctAnswer: "Spyware",
  },
  {
    id: uuidv4(),
    text: "___ is scam software with malicious payloads, usually of limited or no benefit, that are sold to consumers via certain unethical marketing practices.",
    options: ["Malware", "Scareware", "Ransomware", "Spyware"],
    correctAnswer: "Scareware",
  },
  {
    id: uuidv4(),
    text: "Data is ___",
    options: [
      "In its processed form",
      "Raw information",
      "Understanding of information",
      "Processed knowledge",
    ],
    correctAnswer: "Raw information",
  },
  {
    id: uuidv4(),
    text: "Information is ___",
    options: [
      "Processed data",
      "Raw information",
      "Understanding of information",
      "Processed knowledge",
    ],
    correctAnswer: "Processed data",
  },
  {
    id: uuidv4(),
    text: "TIGER Nursing Informatics Competencies Model includes the following except___",
    options: [
      "Basic Computer Competencies",
      "Information Literacy",
      "Information Management",
      "Computer management",
    ],
    correctAnswer: "Computer management",
  },
  {
    id: uuidv4(),
    text: "In using the internet, the Nurse must adhere to the following EXCEPT",
    options: [
      "Do not disclose his/her sexual relationship with a patient",
      "Announce the outbreak of diseases",
      "Disclose where he/she is from",
      "Adhere to professional boundaries",
    ],
    correctAnswer: "Disclose where he/she is from",
  },
  {
    id: uuidv4(),
    text: "The protection of private patient information is one of the most important ethical and legal issues in the field of healthcare.",
    options: ["True", "False", "I do not know", "I am not sure"],
    correctAnswer: "True",
  },
  {
    id: uuidv4(),
    text: "The following are examples of browsers EXCEPT?",
    options: ["Chrome", "Safari", "Allegra", "Firefox"],
    correctAnswer: "Allegra",
  },
  {
    id: uuidv4(),
    text: "A Portal is a Commonly used website serving as an entry point to the Intranet",
    options: ["True", "False", "I do not know", "I am not sure"],
    correctAnswer: "False",
  },
  {
    id: uuidv4(),
    text: "Information is accessible through the Internet consists of interlinked hypertext documents and other resources of the World Wide Web",
    options: ["True", "False", "I do not know", "I am not"],
    correctAnswer: "True",
  },
];
