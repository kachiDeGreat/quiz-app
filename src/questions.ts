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
  {
    id: uuidv4(),
    text: "First aid is an emergency treatment or measure ----------------------- before being taken to the hospital.",
    options: [
      "Given by a qualified healthcare professional",
      "Given to an injured person",
      "Given by an injured person",
      "Given a qualified healthcare professional",
    ],
    correctAnswer: "Given to an injured person",
  },
  {
    id: uuidv4(),
    text: "First Aid should be carried out irrespective of where the accident happened (whether in the hospital or not).",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: uuidv4(),
    text: "One of the following is not a constituent of a first aid box",
    options: ["Bandages", "Antiseptics", "Pain relievers", "Opiod Analgesics"],
    correctAnswer: "Opiod Analgesics",
  },
  {
    id: uuidv4(),
    text: "One of the following is not a constituent of a first aid box",
    options: ["Gauze", "Face shield", "Gloves", "Scissors"],
    correctAnswer: "Face shield",
  },
  {
    id: uuidv4(),
    text: "A more comprehensive kit might also include items like the following, EXCEPT",
    options: ["Mouthwash", "Thermometer", "Eye wash", "First Aid Manual"],
    correctAnswer: "Mouthwash",
  },
  {
    id: uuidv4(),
    text: "Which of the following is NOT a form of bandage and dressing?",
    options: [
      "Adhesive bandages (various sizes)",
      "Plaster of Paris",
      "Sterile gauze pads",
      "Medical tape",
    ],
    correctAnswer: "Plaster of Paris",
  },
  {
    id: uuidv4(),
    text: "Which of the following is NOT a form of bandage and dressing?",
    options: [
      "Cotton wool",
      "Medical tape",
      "Elastic bandages",
      "Triangular bandages (for slings)",
    ],
    correctAnswer: "Cotton wool",
  },
  {
    id: uuidv4(),
    text: "Optional items in a first aid box are as follows, EXCEPT?",
    options: [
      "Emergency blanket",
      "Snake bite kit (depending on location)",
      "Ice blocks",
      "Eye wash solution",
    ],
    correctAnswer: "Ice blocks",
  },
  {
    id: uuidv4(),
    text: "Optional items in a first aid box are as follows, EXCEPT?",
    options: [
      "Snake bite kit (depending on location)",
      "Eye wash solution",
      "Splint or other immobilisation devices",
      "Portable Oxygen cylinder",
    ],
    correctAnswer: "Portable Oxygen cylinder",
  },
  {
    id: uuidv4(),
    text: "A dressing is used to protect a wound and prevent infection",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: uuidv4(),
    text: "A dressing does not allow healing",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: uuidv4(),
    text: "A sterile dressing is not used to control bleeding from a major wound",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: uuidv4(),
    text: "A sterile dressing is used to control bleeding from a major wound",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: uuidv4(),
    text: "A sterile dressing which is past its expiry date should NOT be used.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: uuidv4(),
    text: "________________ is used to secure a dressing in place.",
    options: [
      "Roller bandage",
      "Triangular bandage",
      "Crepe bandage",
      "Gauze bandage",
    ],
    correctAnswer: "Roller bandage",
  },
  {
    id: uuidv4(),
    text: "________________ is used as an arm sling or as a pad to control bleeding.",
    options: [
      "Roller bandage",
      "Triangular bandage",
      "Crepe bandage",
      "Gauze bandage",
    ],
    correctAnswer: "Triangular bandage",
  },
  {
    id: uuidv4(),
    text: "________________ is used to support or immobilise an injury to a bone or joint or as improvised padding over a painful injury.",
    options: [
      "Roller bandage",
      "Triangular bandage",
      "Crepe bandage",
      "Gauze bandage",
    ],
    correctAnswer: "Triangular bandage",
  },
  {
    id: uuidv4(),
    text: "________________ is used to retain a dressing on a finger or toe.",
    options: [
      "Roller bandage",
      "Triangular bandage",
      "Tubular bandage",
      "Gauze bandage",
    ],
    correctAnswer: "Tubular bandage",
  },
  {
    id: uuidv4(),
    text: "Dressings used to control bleeding must be bulky to ensure that adequate pressure is applied over the injured area.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: uuidv4(),
    text: "A dressing that is made up of combined wool or cellulose, covered in a light cotton woven fabric________________",
    options: [
      "Cross-dressing",
      "Combined dressing",
      "Dope dressing",
      "Dupe dressing",
    ],
    correctAnswer: "Cross-dressing",
  },
  {
    id: uuidv4(),
    text: "________________ are used mainly for cleaning a wound.",
    options: [
      "Sterile gauze squares",
      "Sterile cotton squares",
      "Sterile dressing squares",
      "Sterile roll squares",
    ],
    correctAnswer: "Sterile gauze squares",
  },
  {
    id: uuidv4(),
    text: "Cotton wool should NOT be used because of loose cotton fibres that might stick to the wound during healing.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: uuidv4(),
    text: "________________ are used on a minor wound to aid healing, and most have a non-adherent surface.",
    options: [
      "Very light dressings",
      "Non-adherent dressing",
      "Transparent dressings",
      "Translucent dressings",
    ],
    correctAnswer: "Very light dressings",
  },
  {
    id: uuidv4(),
    text: "________________ is often covered on one or both sides with a plastic film containing many perforations.",
    options: [
      "Very light dressings",
      "Non-adherent dressing",
      "Transparent dressings",
      "Translucent dressings",
    ],
    correctAnswer: "Non-adherent dressing",
  },
  {
    id: uuidv4(),
    text: "________________ are used for extensive surface wounds such as an abrasion (graze) or burn.",
    options: [
      "Very light dressings",
      "Transparent dressings",
      "Non-adherent dressing",
      "Translucent dressings",
    ],
    correctAnswer: "Non-adherent dressing",
  },
  {
    id: uuidv4(),
    text: "________________ is used to hold a dressing in place",
    options: [
      "A lightweight cotton bandage",
      "Triangular bandages",
      "Non-adherent bandage",
      "Crepe or elasticised crepe bandage",
    ],
    correctAnswer: "A lightweight cotton bandage",
  },
  {
    id: uuidv4(),
    text: "________________ is used for applying support or firm pressure to a soft tissue injury.",
    options: [
      "A lightweight cotton bandage",
      "Triangular bandages",
      "Non-adherent bandage",
      "Crepe or elasticised crepe bandage",
    ],
    correctAnswer: "Crepe or elasticised crepe bandage",
  },
  {
    id: uuidv4(),
    text: "________________ are usually made from a metre square of cotton or calico that is cut in half diagonally.",
    options: [
      "A lightweight cotton bandage",
      "Triangular bandages",
      "Non-adherent bandage",
      "Crepe or elasticised crepe bandage",
    ],
    correctAnswer: "Triangular bandages",
  },
  {
    id: uuidv4(),
    text: "________________ can be used in various ways as a sling or for immobilisation of broken bones and soft tissue injuries.",
    options: [
      "A lightweight cotton bandage",
      "Triangular bandages",
      "Non-adherent bandage",
      "Crepe or elasticised crepe bandage",
    ],
    correctAnswer: "Triangular bandages",
  },
  {
    id: uuidv4(),
    text: "________________ are pads of gauze or cloth that can be placed directly against the wound to absorb blood and other fluids.",
    options: ["Dressings", "Cotton swabs", "Plasters", "Bandages"],
    correctAnswer: "Dressings",
  },
  {
    id: uuidv4(),
    text: "Another name for cardiac arrest is ________________",
    options: [
      "Sudden Cardiac arrest",
      "Shock",
      "Heart attack",
      "Myocardial arrest",
    ],
    correctAnswer: "Sudden Cardiac arrest",
  },
  {
    id: uuidv4(),
    text: "A ________________ occurs when blood flow to part of the heart muscle is blocked.",
    options: [
      "Sudden Cardiac arrest",
      "Shock",
      "Heart attack",
      "Myocardial arrest",
    ],
    correctAnswer: "Heart attack",
  },
  {
    id: uuidv4(),
    text: "________________ occurs when a clot forms in a blood vessel carrying oxygenated blood to the heart muscle.",
    options: [
      "Sudden Cardiac arrest",
      "Commotio cordis",
      "Heart attack",
      "Myocardial arrest",
    ],
    correctAnswer: "Heart attack",
  },
  {
    id: uuidv4(),
    text: "One of the following is NOT a cause of Cardiac arrest.",
    options: [
      "Coronary artery disease",
      "Ventricular fibrillation",
      "Hereditary",
      "Male gender",
    ],
    correctAnswer: "Male gender",
  },
  {
    id: uuidv4(),
    text: "In younger people, sudden death is a rare event, but since it often involves people involved in athletics",
    options: ["False", "True"],
    correctAnswer: "True",
  },
  {
    id: uuidv4(),
    text: "Commotio cordis is a situation in which the heart stops when an object hits the chest.",
    options: [
      "Sudden Cardiac arrest",
      "Commotio cordis",
      "Heart attack",
      "Myocardial arrest",
    ],
    correctAnswer: "Commotio cordis",
  },
  {
    id: uuidv4(),
    text: "The following are reversible causes of cardiac arrest EXCEPT?",
    options: ["Hypovolemia", "Hypoxia", "Hypervolemia", "Hyperkalaemia"],
    correctAnswer: "Hypervolemia",
  },
  {
    id: uuidv4(),
    text: "The following are reversible causes of cardiac arrest EXCEPT?",
    options: ["Hypothermia", "Hyperthermia", "Hypoglycaemia", "Hyperglycaemia"],
    correctAnswer: "Hyperthermia",
  },
  {
    id: uuidv4(),
    text: "The following are reversible causes of cardiac arrest EXCEPT?",
    options: ["Tablets", "Toxins", "Cardiac tapes", "Tension pneumothorax"],
    correctAnswer: "Cardiac tapes",
  },
  {
    id: uuidv4(),
    text: "The following are reversible causes of cardiac arrest EXCEPT?",
    options: [
      "Thrombosis",
      "Thromboembolism",
      "Traumatic cardiac arrest",
      "Tampons",
    ],
    correctAnswer: "Tampons",
  },
  {
    id: uuidv4(),
    text: "Signs and symptoms of shock include the following EXCEPT?",
    options: ["No pulse", "Fall", "No breathing", "Anaemia"],
    correctAnswer: "Anaemia",
  },
  {
    id: uuidv4(),
    text: "Which of the following devices reduces the chances of dying from a second cardiac arrest?",
    options: [
      "Intrauterine contraceptive device",
      "Implantable cardioverter device",
      "Implantable contraceptive device",
      "Intrauterine cardioverter device",
    ],
    correctAnswer: "Implantable cardioverter device",
  },
  {
    id: uuidv4(),
    text: "AEDs mean?",
    options: [
      "Automated external defibrillators",
      "Automated external defibrillators",
      "Automatic external defibrillators",
      "Automated external defibrillators",
    ],
    correctAnswer: "Automated external defibrillators",
  },
  {
    id: uuidv4(),
    text: "Basic Life Support (BLS), often involving________________",
    options: [
      "Cardiopulmonary Resuscitation",
      "Cardio pelvic Review",
      "Cardiovascular Resuscitation",
      "Cardiopulmonary Review",
    ],
    correctAnswer: "Cardiopulmonary Resuscitation",
  },
  {
    id: uuidv4(),
    text: "CPR means",
    options: [
      "Cardio pelvic Review",
      "Cardiovascular Resuscitation",
      "Cardiopulmonary Review",
      "Cardiopulmonary Resuscitation",
    ],
    correctAnswer: "Cardiopulmonary Resuscitation",
  },
  {
    id: uuidv4(),
    text: "The following are indications that someone needs CPR EXCEPT?",
    options: [
      "A person is unresponsive",
      "A person wants to be touched",
      "A person is not breathing normally",
      "A person is experiencing chest pain",
    ],
    correctAnswer: "A person wants to be touched",
  },
  {
    id: uuidv4(),
    text: "What is the first thing to do when you, as a responder, get to a scene where someone is having cardiac arrest?",
    options: [
      "Call for help",
      "Check for safety",
      "Check pulse",
      "Call out the victim",
    ],
    correctAnswer: "Check for safety",
  },
  {
    id: uuidv4(),
    text: "When you get to the patient, what is the first thing you do?",
    options: [
      "Call for help",
      "Check for safety",
      "Check pulse",
      "Call out the victim",
    ],
    correctAnswer: "Check pulse",
  },
  {
    id: uuidv4(),
    text: "What do you do FIRST when you look at the victims' nostrils who need CPR?",
    options: [
      "Check if nostrils is open without obstructions",
      "Check the chest if he/she is breathing",
      "Check the abdomen if it is moving with respiration",
      "Check for pulse",
    ],
    correctAnswer: "Check if nostrils is open without obstructions",
  },
  {
    id: uuidv4(),
    text: "The second step you take for a victim with cardiac arrest is?",
    options: [
      "Call for help",
      "Check for safety",
      "Check pulse",
      "Call out the victim",
    ],
    correctAnswer: "Call for help",
  },
  {
    id: uuidv4(),
    text: "How do you open the airway of a victim before giving two rescue breaths",
    options: [
      "Lay the patient on his/her back",
      "Tilt the head back and lift the chin",
      "Tilt the chin back and lift the head",
      "Lay the patient on his/her abdomen",
    ],
    correctAnswer: "Tilt the head back and lift the chin",
  },
  {
    id: uuidv4(),
    text: "What is the position for CPR?",
    options: [
      "Lay the patient on his/her abdomen",
      "Lay the Patient in a recovery position",
      "Lay the patient on his/her back",
      "Lay the patient in a convenient position",
    ],
    correctAnswer: "Lay the patient on his/her back",
  },
  {
    id: uuidv4(),
    text: "How do you check for breathing in a patient?",
    options: [
      "Look, listen, and touch the chest for breathing",
      "Look, listen, and feel for breathing",
      "Touch the chest and look for breathing",
      "Speak to the patient and watch he/they respond. No response means no respiration",
    ],
    correctAnswer: "Look, listen, and feel for breathing",
  },
  {
    id: uuidv4(),
    text: "How long are you expected to check for breathing?",
    options: ["5 seconds", "10 seconds", "15 seconds", "20 seconds"],
    correctAnswer: "10 seconds",
  },
  {
    id: uuidv4(),
    text: "How do you place your hands on the chest before compression?",
    options: [
      "Place one hand on the centre of chest",
      "Place both hands on the centre of chest",
      "Place one hand on the centre of chest and the other by the side",
      "Place one hand on the superior part of the chest and the other around the nipple area",
    ],
    correctAnswer: "Place both hands on the centre of chest",
  },
  {
    id: uuidv4(),
    text: "When placing your hands, do you interlock your fingers?",
    options: ["Yes", "No", "Not sure", "No idea"],
    correctAnswer: "Yes",
  },
  {
    id: uuidv4(),
    text: "What is the hand position during compression?",
    options: [
      "Keep arms straight and position horizontally",
      "Keep arms straight and position vertically",
      "Keep arms curved and position vertically",
      "Keep arms straight and position in a recumbent way",
    ],
    correctAnswer: "Keep arms straight and position vertically",
  },
  {
    id: uuidv4(),
    text: "How deep should the compression on the chest be in INCHES?",
    options: ["3", "4", "5", "2"],
    correctAnswer: "2",
  },
  {
    id: uuidv4(),
    text: "How deep should the compression on the chest be in CM?",
    options: ["3", "4", "5", "2"],
    correctAnswer: "5",
  },
  {
    id: uuidv4(),
    text: "The maximum depth for compression is ________________ INCHES?",
    options: ["4.4", "3.4", "5.4", "2.4"],
    correctAnswer: "2.4",
  },
  {
    id: uuidv4(),
    text: "The compression rate during compression is ________________?",
    options: [
      "90-110 beats per minute",
      "100-120 beats per minute",
      "110-130 beats per minute",
      "70-100 beats per minute",
    ],
    correctAnswer: "100-120 beats per minute",
  },
  {
    id: uuidv4(),
    text: "What do you do after each compression?",
    options: [
      "Allow the chest to return fully",
      "Do not allow the chest to return fully",
      "Alternate between allowing and not allowing the chest to return",
      "Ignore observing anything",
    ],
    correctAnswer: "Allow the chest to return fully",
  },
  {
    id: uuidv4(),
    text: "How many rescue breaths do you give during CPR?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "2",
  },
  {
    id: uuidv4(),
    text: "What do you have to ensure when administering rescue breaths?",
    options: [
      "Ensure the breath is deep",
      "Ensure the chest is rising with each breath",
      "Ensure the victim is breathing",
      "Ensure you are carrying out the right assignment.",
    ],
    correctAnswer: "Ensure the chest is rising with each breath",
  },
  {
    id: uuidv4(),
    text: "When carrying out CPR, when should the rescuer NOT stop?",
    options: [
      "When help comes",
      "When you get tired",
      "When the patient is revived",
      "When there is no heartbeat",
    ],
    correctAnswer: "When there is no heartbeat",
  },
  {
    id: uuidv4(),
    text: "What is the compression rate with one rescuer?",
    options: ["15:3", "30:2", "15:2", "30:3"],
    correctAnswer: "15:2",
  },
  {
    id: uuidv4(),
    text: "What is the compression rate with two rescuers?",
    options: ["15:3", "30:2", "15:2", "30:3"],
    correctAnswer: "30:2",
  },
  {
    id: uuidv4(),
    text: "AED is used in place of ________________",
    options: ["Compression", "Comprehension", "Breaths", "Pulse assessment"],
    correctAnswer: "Compression",
  },
  {
    id: uuidv4(),
    text: "The discontinuation in the continuity of the skin by heat, cold, electricity, chemicals, friction, or radiation is ________________.",
    options: ["Burns", "Fracture", "Dislocation", "Debridement"],
    correctAnswer: "Burns",
  },
  {
    id: uuidv4(),
    text: "The following are the classifications of burns EXCEPT?",
    options: ["Surface", "Superficial", "Partial-thickness", "Full-thickness"],
    correctAnswer: "Surface",
  },
  {
    id: uuidv4(),
    text: "The following is NOT a complication of burns",
    options: ["Anaemia", "Scarring", "Contractures", "Constructures"],
    correctAnswer: "Constructures",
  },
  {
    id: uuidv4(),
    text: "The types of burns are the following EXCEPT?",
    options: [
      "Second degree",
      "First degree",
      "Pre-first degree",
      "Third degree",
    ],
    correctAnswer: "Pre-first degree",
  },
  {
    id: uuidv4(),
    text: "First-degree burns result from?",
    options: [
      "Damage to the top two layers of skin, causing blisters and intense pain.",
      "Damage to all layers of skin, often appearing white or charred, with little to no pain.",
      "Damage to the top layer of skin, causing redness and pain.",
      "Damage to the top three layers of skin and blood vessels.",
    ],
    correctAnswer: "Damage to the top layer of skin, causing redness and pain.",
  },
  {
    id: uuidv4(),
    text: "Second-degree burns result from?",
    options: [
      "Damage to the top two layers of skin, causing blisters and intense pain.",
      "Damage to all layers of skin, often appearing white or charred, with little to no pain.",
      "Damage to the top layer of skin, causing redness and pain.",
      "Damage to the top three layers of skin and blood vessels.",
    ],
    correctAnswer:
      "Damage to the top two layers of skin, causing blisters and intense pain.",
  },
  {
    id: uuidv4(),
    text: "Third-degree burns result from?",
    options: [
      "Damage to the top two layers of skin, causing blisters and intense pain.",
      "Damage to all layers of skin, often appearing white or charred, with little to no pain.",
      "Damage to the top layer of skin, causing redness and pain.",
      "Damage to the top three layers of skin and blood vessels.",
    ],
    correctAnswer:
      "Damage to all layers of skin, often appearing white or charred, with little to no pain.",
  },
  {
    id: uuidv4(),
    text: "The following are the causes of burns EXCEPT?",
    options: ["Thermal", "Chemical", "Electric", "Ice"],
    correctAnswer: "Ice",
  },
  {
    id: uuidv4(),
    text: "________________ is burns from exposure to ionising radiation.",
    options: [
      "Thermal burns",
      "Chemical burns",
      "Electrical burns",
      "Radiation burns",
    ],
    correctAnswer: "Radiation burns",
  },
  {
    id: uuidv4(),
    text: "________________ is burns from hot liquids, solids, or flames.",
    options: [
      "Thermal burns",
      "Chemical burns",
      "Electrical burns",
      "Radiation burns",
    ],
    correctAnswer: "Thermal burns",
  },
  {
    id: uuidv4(),
    text: "________________ is burns contact with strong acids or bases.",
    options: [
      "Thermal burns",
      "Chemical burns",
      "Electrical burns",
      "Radiation burns",
    ],
    correctAnswer: "Chemical burns",
  },
  {
    id: uuidv4(),
    text: "The following are the first aid measures for burns EXCEPT?",
    options: [
      "Stop the burn",
      "Cool the burn",
      "Cover the burn",
      "Move away from the source of burn",
    ],
    correctAnswer: "Move away from the source of burn",
  },
  {
    id: uuidv4(),
    text: "How long are you as a rescuer supposed to pour cold water over the burn?",
    options: ["5-10 minutes", "10-20 minutes", "10-15 minutes", "2-5 minutes"],
    correctAnswer: "10-20 minutes",
  },
  {
    id: uuidv4(),
    text: "At home, what is the best measure for first aid of burns?",
    options: [
      "Apply butter",
      "Apply egg or egg products",
      "Move the person to the nearest hospital",
      "Add warm water.",
    ],
    correctAnswer: "Move the person to the nearest hospital",
  },
  {
    id: uuidv4(),
    text: "Which of the following is NOT an intervention for burns?",
    options: [
      "Run water over the burns",
      "Apply ice over the burns",
      "Cover with clean clothes",
      "Cool the burns",
    ],
    correctAnswer: "Apply ice over the burns",
  },
  {
    id: uuidv4(),
    text: "________________ is an injury to the ligament?",
    options: ["Sprain", "Fracture", "Dislocation", "Burns"],
    correctAnswer: "Sprain",
  },
  {
    id: uuidv4(),
    text: "How many types of sprains exist?",
    options: ["4", "3", "2", "5"],
    correctAnswer: "3",
  },
  {
    id: uuidv4(),
    text: "A mild sprain where the ligament is stretched but not torn is?",
    options: ["Grade 1", "Grade 2", "Grade 3", "Grade 4"],
    correctAnswer: "Grade 1",
  },
  {
    id: uuidv4(),
    text: "A partial tear of the ligament, causing some instability in the joint, is?",
    options: ["Grade 1", "Grade 2", "Grade 3", "Grade 4"],
    correctAnswer: "Grade 2",
  },
  {
    id: uuidv4(),
    text: "A complete tear of the ligament, leading to a loose and unstable joint, is?",
    options: ["Grade 1", "Grade 2", "Grade 3", "Grade 4"],
    correctAnswer: "Grade 3",
  },
  {
    id: uuidv4(),
    text: "The common causes of sprain include the following EXCEPT?",
    options: ["Twisting", "Wrenching a joint", "Overexertion", "Over flexion"],
    correctAnswer: "Over flexion",
  },
];
