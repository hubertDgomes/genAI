const resume = `
  Name: Daniel M. Okafor
  Email: daniel.okafor.dev@gmail.com
  Phone: +1 (415) 555-0187
  Location: Austin, TX
  LinkedIn: linkedin.com/in/daniel-okafor
  GitHub: github.com/danielokafor

  Professional Summary
  Full Stack Software Engineer with 5+ years of experience designing, building, and optimizing web applications for fintech, SaaS, and e-commerce platforms. Strong expertise in JavaScript, TypeScript, Node.js, React, Express, PostgreSQL, MongoDB, and cloud deployment on AWS. Skilled in building scalable APIs, improving application performance, leading feature development from planning through deployment, and collaborating with cross-functional teams in agile environments.

  Core Skills
  - Languages: JavaScript, TypeScript, Python, SQL, HTML5, CSS3
  - Frontend: React.js, Next.js, Redux, Tailwind CSS, Material UI, Jest, Cypress
  - Backend: Node.js, Express.js, NestJS, REST APIs, GraphQL, WebSockets
  - Databases: PostgreSQL, MySQL, MongoDB, Redis
  - DevOps: Docker, GitHub Actions, CI/CD, AWS EC2, S3, RDS, CloudFront, Lambda
  - Tools: Git, Jira, Postman, Figma, Swagger, Jira, Notion
  - Practices: System design, API security, performance tuning, clean code, testing, code reviews

  Work Experience

  Senior Full Stack Engineer
  BrightLoop Analytics | June 2022 – Present
  - Built and maintained a multi-tenant analytics dashboard serving 30,000+ users, processing large datasets with optimized SQL queries and caching strategies.
  - Led the migration of a legacy frontend from plain JavaScript to React and TypeScript, improving code quality and reducing bug density by 38%.
  - Designed and implemented secure REST APIs using Node.js and Express for reporting, authentication, billing, and audit logs.
  - Integrated Stripe, AWS SES, and Slack webhooks to automate billing workflows, notifications, and customer communications.
  - Worked closely with product managers, designers, and data engineers to define requirements and deliver features on a bi-weekly sprint cycle.
  - Improved page load performance by 45% by reducing redundant API calls, lazy-loading chart components, and optimizing backend query performance.

  Full Stack Developer
  Harbor Commerce | August 2020 – May 2022
  - Developed and maintained an e-commerce platform used by small-to-medium businesses, including product management, checkout, inventory, and reporting modules.
  - Built inventory and order APIs in Node.js, with PostgreSQL as the source of truth and Redis for caching high-traffic queries.
  - Implemented role-based access control and JWT-based authentication workflows for admins, vendors, and customers.
  - Created reusable React components for dashboards, forms, and product pages, improving frontend consistency and reducing development time.
  - Reduced order processing time by 30% by simplifying the checkout flow and refactoring backend services.

  Frontend Developer
  PixelForge Studio | January 2019 – July 2020
  - Created responsive marketing websites and internal business portals for startups and agencies using HTML, CSS, JavaScript, and React.
  - Collaborated with designers and backend engineers to translate wireframes into production-ready interfaces.
  - Implemented SEO improvements, accessibility enhancements, and cross-browser compatibility fixes.
  - Wrote automated UI tests for critical flows using Jest and Cypress.

  Projects

  Real-Time Collaboration Tool
  - Built a Node.js + Socket.IO application for live chat, presence tracking, and collaborative note editing.
  - Added authentication, file uploads, and message persistence with MongoDB.
  - Deployed on AWS EC2 behind a load balancer with Docker-based environment setup.

  AI-Powered Resume Analyzer
  - Created a full-stack application that analyzed resumes and job descriptions to provide skill matching and interview readiness scoring.
  - Used React for the interface, Express for backend APIs, and PostgreSQL for storing user profiles and reports.
  - Integrated GPT-based summarization and structured extraction workflows.

  Education
  Bachelor of Science in Computer Science
  University of Texas at Arlington | 2014 – 2018

  Certifications
  - AWS Certified Cloud Practitioner
  - Google Cloud Associate Cloud Engineer (in progress)
  - Agile Scrum Foundation
`;

const selfDescription = `
  I am a software engineer who enjoys solving real business problems through clean, scalable technology. I like working on products where I can connect both user experience and backend reliability, because I believe the strongest systems are built when teams understand both sides of the product.

  In my most recent role, I have been responsible for building analytics and reporting features that help customers understand business performance quickly and confidently. I enjoy turning complex requirements into intuitive interfaces and dependable APIs. I am comfortable working with product managers, designers, QA engineers, and data teams to ensure we deliver value in a structured and collaborative way.

  I am especially interested in building systems that are maintainable, testable, and resilient. I take a proactive approach to code quality by writing reusable components, documenting APIs, reviewing code carefully, and improving performance before problems appear. I also value communication and feedback because I believe good engineering teams are built on trust and clarity.

  I have experience working in agile environments, handling multiple priorities, and adapting quickly when requirements change. I enjoy mentoring newer engineers and contributing to a team culture that is supportive, curious, and accountable. I am motivated by work that combines technical depth, product impact, and continuous learning.

  Outside of work, I spend time improving my engineering skills by exploring distributed systems, monitoring, and cloud architecture. I also enjoy reading technical articles, learning from open source communities, and staying current with modern frontend and backend patterns.
`;

const jobDescription = `
  Senior Full Stack Developer

  About the Role
  We are looking for a Senior Full Stack Developer to join our product engineering team. This person will help build and improve customer-facing web applications, internal tooling, and backend services that power our core operations. The ideal candidate is highly collaborative, technically strong, and comfortable working across the full stack from UI design to database optimization.

  Responsibilities
  - Design and develop scalable web applications using React, TypeScript, Node.js, and related modern tools.
  - Build and maintain RESTful APIs and backend services with strong emphasis on performance, reliability, and security.
  - Collaborate with product managers, designers, and engineers to translate business requirements into practical technical solutions.
  - Work with databases such as PostgreSQL and MongoDB to design schemas, optimize queries, and analyze performance issues.
  - Own features end-to-end from planning and coding to testing, deployment, and monitoring.
  - Ensure code quality through code reviews, automated testing, and documentation.
  - Improve application performance by identifying bottlenecks in frontend rendering, API response times, and infrastructure setup.
  - Participate in architecture discussions and contribute to engineering best practices across the team.

  Requirements
  - 5+ years of experience in software engineering with a focus on full stack development.
  - Strong knowledge of JavaScript/TypeScript, React, Node.js, and Express or similar frameworks.
  - Experience with SQL and NoSQL databases, including query optimization and schema design.
  - Familiarity with cloud platforms such as AWS, especially EC2, S3, RDS, and Lambda.
  - Understanding of REST APIs, authentication flows, authorization patterns, and application security.
  - Experience with CI/CD pipelines, Docker, Git, and modern deployment workflows.
  - Strong debugging and problem-solving skills with the ability to work independently and with a team.
  - Excellent communication skills and ability to explain technical trade-offs to both technical and non-technical stakeholders.
  - Experience working in agile environments and collaborating on product priorities.

  Nice to Have
  - Experience with Next.js, GraphQL, microservices, or event-driven systems.
  - Exposure to AI/ML workflows, data tooling, or analytics dashboards.
  - Experience mentoring junior engineers or leading technical initiatives.

  Why Join Us
  We are a fast-moving product company building tools that help teams make smarter operational decisions. We value engineers who care deeply about user experience, product quality, and continuous improvement. This role offers the opportunity to work on meaningful problems, learn from a strong engineering culture, and grow into greater technical leadership.
`;

export { resume, selfDescription, jobDescription };

export default {
    resume,
    selfDescription,
    jobDescription,
};