import React from "react";

export const metadata = {
  title: "CV - Deft Valian Exanova",
  description: "Curriculum Vitae of Deft Valian Exanova",
};

export default function CVPage() {
  return (
    <div className="min-h-screen bg-neutral-200 py-10 print:py-0 print:bg-white flex justify-center">
      <div className="w-full max-w-[210mm] min-h-[297mm] bg-white text-black shadow-lg print:shadow-none print:w-full print:max-w-none px-12 py-10 text-justify" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
        
        {/* Header */}
        <header className="text-center mb-4">
          <h1 className="text-[28px] font-bold leading-tight mb-1">Deft Valian Exanova</h1>
          <p className="text-[13px] leading-relaxed">
            Cikarang Barat, Kab. Bekasi, 17530 • deftvalian2411@gmail.com • (+62) 85 156 098 261 • linkedin.com/in/deftvalian/ • portfolioexv.netlify.app
          </p>
        </header>

        {/* Summary */}
        <section className="mb-4 text-[13px] leading-relaxed">
          <p>
            Information Systems Fresh Graduate and Software Engineer with comprehensive internship experience in developing and modernizing high-impact web applications. Proficient in Full-stack development utilizing the Laravel and React ecosystems. Demonstrated a proven track record in digitalizing manual business workflows into efficient systems, and optimizing web performance through modern techniques such as lazy loading and responsive design. Adept at bridging technical requirements with business goals through effective stakeholder communication, ensuring the delivery of scalable and user-centric digital solutions.
          </p>
        </section>

        {/* Education */}
        <section className="mb-4">
          <h2 className="text-[18px] font-bold mb-1">Singaperbangsa Karawang University | Karawang, Indonesia</h2>
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-[13px] font-bold">Bachelor's Degree of Information System</h3>
            <span className="text-[13px] font-bold">(Aug 2022 – Present)</span>
          </div>
          <ul className="list-disc list-outside ml-6 text-[13px] leading-relaxed">
            <li className="pl-1 mb-1">GPA: 3.92 / 4.0</li>
            <li className="pl-1">Relevant Courses: Web-based Programming, Object-Oriented Programming, Programming Algorithms, Software Engineering, Information Systems Design Analysis, Advanced Database, Data Structure Algorithms</li>
          </ul>
        </section>

        {/* Experiences */}
        <section className="mb-4">
          <h2 className="text-[20px] font-bold mb-2">Experiences</h2>
          
          {/* Advics */}
          <div className="mb-3">
            <h3 className="text-[15px] font-bold">PT Advics Manufacturing Indonesia | Software Engineer (Website)</h3>
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-[13px] font-bold">Internship</h4>
              <span className="text-[13px] font-bold">(Aug 2025 – Feb 2026)</span>
            </div>
            <ul className="list-disc list-outside ml-6 text-[13px] leading-relaxed">
              <li className="pl-1 mb-1">Engineered high-impact web applications and modernized legacy systems by adding advanced features and rebuilding existing architectures to successfully digitalize manual operational processes, utilizing Laravel, MySQL, and PostgreSQL.</li>
              <li className="pl-1 mb-1">Optimized system performance and user interfaces by implementing lazy loading for efficient large-dataset fetching and ensuring fully responsive designs across devices, utilizing React, Tailwind CSS, and GitHub for version control.</li>
              <li className="pl-1">Streamlined the software development lifecycle by facilitating direct requirement-gathering meetings with end-users, effectively translating business needs into technical solutions and presenting regular progress updates.</li>
            </ul>
          </div>

          {/* Vocasia */}
          <div className="mb-3">
            <h3 className="text-[15px] font-bold">Vocasia | Frontend Website Developer</h3>
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-[13px] font-bold">Internship</h4>
              <span className="text-[13px] font-bold">(Jan 2025 – Jun 2025)</span>
            </div>
            <ul className="list-disc list-outside ml-6 text-[13px] leading-relaxed">
              <li className="pl-1 mb-1">Engineered responsive and interactive frontend components by precisely slicing UI/UX designs, ensuring cross-browser compatibility and seamless user experience.</li>
              <li className="pl-1 mb-1">Collaborated effectively within a cross-functional team alongside UI/UX designers to deliver visually appealing, user-centric web layouts while meeting strict project deadlines.</li>
              <li className="pl-1">Developed and maintained robust frontend features utilizing Next.js, TypeScript, and Chakra UI, significantly improving website performance and maintainability.</li>
            </ul>
          </div>

          {/* Hacktiv8 */}
          <div className="mb-3">
            <h3 className="text-[15px] font-bold">Hacktiv8 | ReactJS for Frontend Web Developer</h3>
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-[13px] font-bold">Participants</h4>
              <span className="text-[13px] font-bold">(Sep 2024 – Dec 2024)</span>
            </div>
            <ul className="list-disc list-outside ml-6 text-[13px] leading-relaxed">
              <li className="pl-1 mb-1">Completed 35 learning materials covering HTML, CSS, ReactJS, Testing, Web Storage, and Deployment; completed 21 quizzes related to web development; and completed 6 assignments with a perfect score (100) on all assignments.</li>
              <li className="pl-1 mb-1">Completed an E-Commerce themed Capstone Project with a login feature whose credentials are customized with the provided API, Add to Cart feature, and Checkout feature. The project was built using ReactJS, TailwindCSS, Flowbite Tailwind, Redux, and Web Storage.</li>
              <li className="pl-1">Completed the program with final score 97,5 and managed to get a certificate of completion and get a score of 95 on the final project.</li>
            </ul>
          </div>

          {/* Sanbercode */}
          <div className="mb-3">
            <h3 className="text-[15px] font-bold">Sanbercode | ReactJS Web Frontend Bootcamp</h3>
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-[13px] font-bold">Participants</h4>
              <span className="text-[13px] font-bold">(Jan 2024 – Feb 2024)</span>
            </div>
            <ul className="list-disc list-outside ml-6 text-[13px] leading-relaxed">
              <li className="pl-1 mb-1">Worked on 12 mini projects, 1 final project and 3 quizzes and attended 1 month of meetings with a total of 15 learning hours and learned a total of 24 materials such as git, es6, tailwind, components & props, routes, rest api with axios, hooks, state authentication, authorization, flowbite tailwind, deployment using netlify.</li>
              <li className="pl-1 mb-1">Creating a job seeker frontend application called CareerSync using react js, tailwind and flowbite which has Create, Read, Update, Delete features.</li>
              <li className="pl-1">Received an award as the best participant out of 50 participants with a final project score of 97 and also the most active participant in batch 53.</li>
            </ul>
          </div>
        </section>

        {/* Skills & Languages */}
        <section>
          <h2 className="text-[20px] font-bold mb-2">Skills & Languages</h2>
          <div className="text-[13px] leading-relaxed space-y-1">
            <p>
              <span className="font-bold">Technical:</span> PHP, JavaScript, TypeScript | Laravel, ReactJS, Next.js, VueJS | Tailwind, Bootstrap | MySQL, PostgreSQL | Git, Figma
            </p>
            <p>
              <span className="font-bold">Interpersonal:</span> Problem Solving, Requirements Analysis, Effective Communication, Teamwork.
            </p>
            <p>
              <span className="font-bold">Language:</span> Indonesia (Native) and English (Intermediate).
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
