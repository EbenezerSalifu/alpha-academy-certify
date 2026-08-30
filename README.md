# Alpha Academy Certify

Build a complete, production-ready online AI Assessment and Certification Platform for ALPHA ACADEMY.



BRAND

ALPHA ACADEMY

Slogan: FROM LEARNING TO LEADING.



The platform will allow users to provide their name and email, select an AI assessment category, take a 30-question multiple-choice assessment, receive an automatic score, and generate a personalized Alpha Academy certificate if they pass.



IMPORTANT:

I will provide the actual certificate templates and assessment questions. Do not invent questions, answers, certificate designs, or assessment content.



==================================================

1. LANDING PAGE

==================================================



Create a premium, modern, professional landing page for ALPHA ACADEMY.



Use the Alpha Academy branding and a clean blue, white and dark/navy visual identity.



Display:



ALPHA ACADEMY



AI SKILLS ASSESSMENT



"Test your AI knowledge. Prove your skills. Earn your certificate."



Include a short explanation that candidates will take a 30-question assessment and receive a certificate if they achieve the required passing score.



Primary button:



START ASSESSMENT



The website must be fully responsive and optimized for mobile, tablet and desktop.



==================================================

2. CANDIDATE INFORMATION

==================================================



When the candidate clicks START ASSESSMENT, display a form requesting:



- Full Name

- Gmail/Email Address



Both fields are required.



Validate the email address.



The exact name entered by the candidate must be stored and later used for certificate generation.



Do not allow the candidate to start the assessment without completing the required information.



==================================================

3. ASSESSMENT CATEGORY

==================================================



After entering their information, the candidate must select ONE assessment:



1. AI FOR STUDENTS

2. AI FOR ENTREPRENEURS

3. AI FOR PROFESSIONALS



Display the three options as professional selectable cards.



The selected category determines:



- Which questions the candidate receives

- Which certificate template they receive if they pass



Do not mix questions between categories.



==================================================

4. ASSESSMENT SYSTEM

==================================================



Each category contains exactly 30 multiple-choice questions.



There will eventually be:



30 questions — AI FOR STUDENTS

30 questions — AI FOR ENTREPRENEURS

30 questions — AI FOR PROFESSIONALS



Total: 90 questions.



Each question contains:



- Question text

- Option A

- Option B

- Option C

- Option D

- Correct answer

- Category

- Active/inactive status



The candidate sees only the question and answer options.



The correct answer must NEVER be shown to the candidate before submission.



Questions and correct answers must be stored securely in the backend/database.



Do not hard-code the correct answers in publicly accessible frontend code.



==================================================

5. ASSESSMENT INTERFACE

==================================================



Create a professional examination interface.



Show:



- Current question number

- Total questions

- Progress indicator

- Question

- Four answer choices



Example:



QUESTION 7 OF 30



[Question text]



○ A. Option

○ B. Option

○ C. Option

○ D. Option



Include:



- Previous

- Next

- Submit Assessment



The candidate should be able to move backward and forward between questions.



Preserve their selected answers when navigating between questions.



Before final submission, show a confirmation message such as:



"You are about to submit your assessment. Once submitted, your answers cannot be changed."



==================================================

6. SCORING

==================================================



After submission, automatically calculate:



- Number correct

- Number incorrect

- Percentage score

- Pass/fail status



There are 30 questions.



Use:



percentage = (correct answers / 30) × 100



IMPORTANT PASSING RULE:



The candidate must score ABOVE 50% to pass.



Therefore:



15/30 = 50% = FAIL



16/30 = 53.33% = PASS



The system must use:



percentage > 50



as the passing condition.



==================================================

7. RESULT PAGE — PASS

==================================================



If the candidate passes, display an exciting congratulations page.



Example:



🎉 CONGRATULATIONS!



YOU PASSED!



You have successfully completed the AI Skills Assessment.



Display:



Score: 24/30

Percentage: 80%

Assessment: AI FOR PROFESSIONALS

Status: PASSED



Use a tasteful celebration effect such as stars or a subtle celebratory animation.



Then display a prominent button:



GENERATE CERTIFICATE



Only candidates who pass may access certificate generation.



==================================================

8. RESULT PAGE — FAIL

==================================================



If the candidate fails, display an encouraging result page.



Example:



KEEP LEARNING!



You did not meet the required passing score.



Display:



Score

Percentage

Assessment category

Status: NOT PASSED



Provide an encouraging message.



Do NOT display the Generate Certificate button to failed candidates.



==================================================

9. CERTIFICATE TEMPLATES

==================================================



I have provided three official Alpha Academy certificate template files.



Use these EXACT uploaded files:



STUCERT.PNG

→ AI FOR STUDENTS



ENTCERT.PNG

→ AI FOR ENTREPRENEURS



PROCERT.PNG

→ AI FOR PROFESSIONALS



These are the official Alpha Academy certificate templates.



Do not redesign, recreate, substitute, or alter the certificate templates.



Map each certificate template strictly to its corresponding assessment category.



AI FOR STUDENTS

→ Use STUCERT.PNG



AI FOR ENTREPRENEURS

→ Use ENTCERT.PNG



AI FOR PROFESSIONALS

→ Use PROCERT.PNG



Do not interchange the certificate templates.



==================================================

10. DYNAMIC CERTIFICATE GENERATION

==================================================



When a candidate passes and clicks GENERATE CERTIFICATE:



1. Identify the assessment category.

2. Select the corresponding certificate template.

3. Retrieve the candidate's full name from their assessment record.

4. Place the candidate's name into the designated blank name area on the certificate.

5. Preserve the original certificate design.



The candidate's name must be dynamically inserted.



The name should be placed in the blank area beneath:



"THIS IS TO CERTIFY THAT"



on the corresponding certificate.



Do not require the administrator to manually type the candidate's name.



Do not alter any other part of the certificate.



Preserve:



- Alpha Academy logo

- Certificate title

- Background

- Colours

- Typography

- Decorative elements

- Seal/badge

- Date

- Signature

- Founder information

- Existing certificate text

- Overall layout



Only dynamically add the candidate's name to the designated name area.



The generated certificate must maintain the original aspect ratio and visual quality of the uploaded certificate.



Provide:



VIEW CERTIFICATE



and



DOWNLOAD CERTIFICATE



options.



Preferably generate the final certificate as a high-quality PDF suitable for printing and digital sharing.



==================================================

11. ADMINISTRATOR SYSTEM

==================================================



Create a secure ADMIN DASHBOARD.



Initial administrator email:



alphaacademy500@gmail.com



This email must have administrator privileges and access to the complete Admin Dashboard.



Do NOT hard-code an administrator password into the frontend, source code, or any publicly accessible configuration.



Use a secure authentication system for the administrator password.



The administrator should be able to securely log in and log out.



Only authenticated administrators can access the Admin Dashboard.



Normal candidates must never have access to the Admin Dashboard.



==================================================

12. ADMIN DASHBOARD OVERVIEW

==================================================



Create a professional dashboard showing:



- Total assessment attempts

- Total candidates

- Total passed

- Total failed

- Overall pass rate

- Average score



Also show category statistics:



AI FOR STUDENTS

AI FOR ENTREPRENEURS

AI FOR PROFESSIONALS



Show the number of:



- Attempts

- Passes

- Failures



for each category.



==================================================

13. ALL ASSESSMENT ATTEMPTS

==================================================



THIS IS EXTREMELY IMPORTANT.



EVERY PERSON WHO SUBMITS AN ASSESSMENT MUST BE SAVED TO THE DATABASE.



Do not only save candidates who pass.



Save BOTH:



- Passed candidates

- Failed candidates



For every completed assessment, record:



- Full name

- Email

- Assessment category

- Score

- Total questions

- Percentage

- Pass/fail status

- Date

- Time

- Candidate's selected answers

- Correct answer/result data

- Certificate generated status

- Certificate generation date/time, if applicable



Every submitted assessment must create a permanent assessment-attempt record.



==================================================

14. ADMIN CANDIDATE TABLE

==================================================



Create an "Assessment Attempts" page in the Admin Dashboard.



Display:



Name | Email | Assessment | Score | Percentage | Status | Date | Certificate



Allow the administrator to:



- Search by name

- Search by email

- Filter by category

- Filter by pass/fail

- Sort by score

- Sort by date

- Open a candidate's full assessment record



When viewing a candidate's record, show:



- Candidate information

- Assessment category

- Score

- Percentage

- Pass/fail status

- All 30 questions

- Candidate's selected answers

- Correct answers

- Questions answered correctly

- Questions answered incorrectly

- Certificate status

- Certificate information



==================================================

15. EXPORT RESULTS

==================================================



Add an export function to the Admin Dashboard.



The administrator should be able to export assessment results in CSV format that can be opened in Microsoft Excel or Google Sheets.



Export fields should include:



- Name

- Email

- Category

- Score

- Percentage

- Status

- Date

- Certificate status



==================================================

16. QUESTION BANK

==================================================



Create an Admin Dashboard section called:



QUESTION BANK



The administrator must be able to:



- Add questions

- Edit questions

- Delete questions

- Select category

- Add Option A

- Add Option B

- Add Option C

- Add Option D

- Select the correct answer

- Activate/deactivate questions



Questions must be stored in the database.



The system should support:



AI FOR STUDENTS

30 questions



AI FOR ENTREPRENEURS

30 questions



AI FOR PROFESSIONALS

30 questions



The assessment should pull questions only from the selected category.



Do not randomly mix categories.



==================================================

17. BULK QUESTION IMPORT

==================================================



Allow the administrator to enter questions manually OR import them in bulk using CSV.



Use this CSV structure:



category,question,option_a,option_b,option_c,option_d,correct_answer



Example:



AI FOR STUDENTS,"What is artificial intelligence?","Option A","Option B","Option C","Option D","B"



Validate imported questions before saving.



Do not import a question if:



- The category is missing

- The question is missing

- Any option is missing

- The correct answer is missing

- The correct answer is not A, B, C or D



==================================================

18. CERTIFICATE MANAGEMENT

==================================================



Create an Admin Dashboard section called:



CERTIFICATE MANAGEMENT



Display the three certificate templates:



STUCERT.PNG → AI FOR STUDENTS

ENTCERT.PNG → AI FOR ENTREPRENEURS

PROCERT.PNG → AI FOR PROFESSIONALS



Allow the administrator to replace/update certificate templates in the future without modifying application code.



The certificate-to-category mapping must remain intact when templates are replaced.



==================================================

19. DATABASE STRUCTURE

==================================================



Use a real persistent backend/database.



Create appropriate database structures for:



- Candidates

- Assessment categories

- Questions

- Assessment attempts

- Candidate answers

- Certificates

- Administrator accounts



Use proper relationships between records.



Do NOT rely on temporary frontend state for permanent data storage.



Assessment results must remain available even after refreshing or closing the website.



==================================================

20. SECURITY

==================================================



Protect the correct answers from candidates.



Candidates must not be able to access:



- Correct answer database records

- Admin Dashboard

- Question management

- Certificate template management

- Other candidates' information

- Assessment results belonging to other candidates



Only authenticated administrators can access administrative data.



Use proper backend authorization and database security rules.



The scoring process should be performed securely on the backend/server side where possible.



==================================================

21. DESIGN

==================================================



The website should look premium and professional.



Visual direction:



- Alpha Academy branding

- Blue

- White

- Black/dark navy

- Modern typography

- Clean cards

- Subtle animations

- Professional academic/technology aesthetic



Avoid making the website look childish or like a generic quiz website.



The assessment experience should feel like a real professional certification examination.



Make the entire platform responsive for:



- Mobile

- Tablet

- Desktop



Mobile usability is especially important.



==================================================

22. IMPORTANT DATA FLOW

==================================================



The complete user flow must be:



LANDING PAGE

↓

ENTER FULL NAME + EMAIL

↓

SELECT ASSESSMENT

↓

TAKE 30 QUESTIONS

↓

SUBMIT

↓

AUTOMATIC SCORING

↓

RESULT

↓

IF ABOVE 50%

↓

GENERATE CERTIFICATE

↓

VIEW / DOWNLOAD CERTIFICATE



At the same time:



EVERY SUBMITTED ASSESSMENT

↓

DATABASE

↓

ADMIN DASHBOARD



Both PASS and FAIL attempts must be recorded.



==================================================

23. DO NOT USE FAKE DATA

==================================================



Do not create a fake/demo backend that only appears to work.



The database must actually persist:



- Candidate information

- Assessment attempts

- Answers

- Scores

- Pass/fail status

- Certificate status



The Admin Dashboard must display real data from the database.



Do not use mock candidate records as a substitute for the real database.



==================================================

24. TESTING REQUIREMENTS

==================================================



Before considering the platform complete, test all major functionality.



Test:



- Candidate registration

- Email validation

- Category selection

- 30-question assessment

- Previous/Next navigation

- Answer persistence

- Assessment submission

- Automatic scoring

- 15/30 = FAIL

- 16/30 = PASS

- Certificate generation

- Correct certificate selection

- Candidate name insertion

- Certificate download

- Failed candidates cannot generate certificates

- Every completed assessment appears in Admin Dashboard

- Search and filtering

- CSV export

- Admin authentication

- Database persistence

- Mobile responsiveness

- Security of correct answers



==================================================

25. IMPORTANT IMPLEMENTATION RULE

==================================================



Do not invent or replace my actual assessment questions.



I will provide the questions and correct answers separately through the Question Bank/import system.



Do not create placeholder questions and treat them as final questions.



Build the platform architecture so that I can easily upload/enter my actual questions and answers.



Use the three uploaded certificate files exactly as the certificate templates:



STUCERT.PNG

ENTCERT.PNG

PROCERT.PNG



Start by building the complete application architecture, database, authentication, candidate flow, assessment engine, Admin Dashboard, certificate-management system, and certificate-generation infrastructure.



Make sure all components are properly connected to the real persistent backend/database.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0f298129-978e-429e-adc3-818639c3844d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
