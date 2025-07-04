import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Ayden',
    lastName:  'Nguyen',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Computer Engineering Student',
    avatar:    '/images/avatar.jpg',
    location:  'America/Vancouver',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['English']  // optional: Leave the array empty if you don't want to display languages
}

const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/u759',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/aydennguyen/',
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:aydennguyen604@gmail.com',
    },
    {
        name: 'Resume',
        icon: 'resume',
        link: '/files/resume.pdf',
    }
]

const home = {
    label: 'Home',
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: <>Ayden Nguyen</>,
    subline: <>I am a 2nd year Computer Engineering Student at <InlineCode>UBC</InlineCode> with a focus on backend development and embedded systems. </>
}

const about = {
    label: 'About',
    title: 'About me',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: false
    },
    avatar: {
        display: true
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: <>A place for me to list my experience and projects.</>
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Experience',
        experiences: [
            {
                company: 'BC Liquor Distribution Branch (BCLDB)',
                timeframe: 'May 2025 - present',
                role: 'Middleware Administrator Assistant',
                achievements: [
                    <>Maintaining DEV and TEST infrastructure for the BCLDB, ensuring up-to-date security patches on Red Hat Enterprise systems.</>,
                    <>Administering Java deployments via Oracle Service Bus, Wildfly, Service Oriented Architecture, and Glowroot, accelerating developer testing and integration.</>,
                    <>Ensuring access to PostgreSQL, Microsoft SQL, and Oracle SQL databases, supporting developer and retail operations.</>,
                    <>Monitoring and troubleshooting infrastructure, ensuring data integrity and reliability for the IT team.</>
                ],
                images: []
            },
            {
                company: 'UBC AeroDesign - University Engineering Design Team',
                timeframe: 'June 2025 - present',
                role: 'Firmware Developer',
                achievements: [
                    <>Developing flight control firmware for vertical takeoff/landing (VTOL) electric aircraft.</>,
                    <>Implementing C code on an STM32H7 and custom power electronics for automomous flight, takeoff/landing, and waypoint navigation with PID, GPS, IMU, Airspeed, and Barometer sensor fusion.</>,
                    <>Optimizing telemetry for ground-based monitoring.</>
                ],
                images: []
            },
            {
                timeframe: 'Sept. 2023 - June 2025',
                role: 'Power & Controls Lead',
                achievements: [
                    <>Engineering a high-performance electric aircraft to compete at SAE AeroDesign West. Achieved the highest thrust-to-weight ratio in team history.</>,
                    <>Leading a team of 6 students to design a high-performance electric propulsion system. Spearheading the development of PCBs for propulsion testing and power distribution.</>,
                    <>Implemented C code for an embedded Arduino system to test propulsion performance.</>
                ],
                images: [
                    {
                        src: '/images/experience/aero1.jpg',
                        alt: 'UBC AeroDesign',
                        width: 20,
                        height: 12
                    },
                    {
                        src: '/images/experience/aero2.jpg',
                        alt: 'UBC AeroDesign',
                        width: 20,
                        height: 24
                    }
                 ]
            },
            {
                company: 'University of British Columbia - Department of Computer Science',
                timeframe: 'Sept - Dec 2023',
                role: 'Examination Invigilator',
                achievements: [
                    <>Responsible for invigilating computer science exams. Assisted students with technical issues and provided support during exams.</>,
                    <>Designed a Python script to schedule proctors based on exam availability and location.</>
                ],
                images: [ // optional: leave the array empty if you don't want to display images
                    {
                        src: '/images/experience/ubccs.jpg',
                        alt: 'UBC Computer Science',
                        width: 16,
                        height: 9
                    }
                ]
            },
            {
                company: 'Free Geek Vancouver',
                timeframe: '2021 - 2022',
                role: 'Hardware Volunteer',
                achievements: [
                    <>Responsible for repairing and refurbishing donated computers and electronics.</>,
                    <>Constructed computers from donated hardware, installed Windows and essential programs. Sold computers at a discount to the public, preventing 1000+ computers from being disposed of.</>,
                    <>Aided new volunteers in the recycling process of computer components.</>
                ],
                images: [
                    {
                        src: '/images/experience/free1.jpg',
                        alt: 'Free Geek Vancouver',
                        width: 20,
                        height: 20
                    }
                 ]
            }
        ]
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Education',
        institutions: [
            {
                name: 'University of British Columbia (UBC)',
                description: <>Computer Engineering, BASc year 2.</>,
            },
            {
                name: 'Canadian Flight Centre',
                description: <>Obtained my Private Pilot License from the Air Cadet Program.</>,
            }
        ]
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Technical skills',
        skills: [
            {
                title: 'Object-Oriented Programming',
                description: <>Proficient in Java, JUnit, Git, Spring Boot.</>,
                // optional: leave the array empty if you don't want to display images
                images: [
                ]
            },
            {
                title: 'SQL and NoSQL',
                description: <>PostgreSQL/indices for full stack web-app using Supabase, MongoDB to store local events.</>,
                // optional: leave the array empty if you don't want to display images
                images: [
                ]
            },
            {
                title: 'SystemVerilog and FPGA',
                description: <>Designed a RISC CPU in SystemVerilog and implemented it on an FPGA.</>,
                // optional: leave the array empty if you don't want to display images
                images: [
                ]
            },
            {
                title: 'DevOps and Middleware',
                description: <>Experienced in Docker, Virtualization, Linux, and Service Oriented Architecture. Proficient in Debian/Red Hat systems for software deployment.</>,
                // optional: leave the array empty if you don't want to display images
                images: [
                ]
            },
            {
                title: 'Embedded Systems',
                description: <>Programming in C for STM32, ATmega328P, ESP32, and Raspberry Pi.</>,
                // optional: leave the array empty if you don't want to display images
                images: [
                ]
            }
        ]
    }
}

const blog = {
    label: 'Blog',
    title: 'Random stuff...',
    description: `Read what ${person.name} has been up to recently`
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

const work = {
    label: 'Projects',
    title: 'My projects',
    description: `Design and dev projects by ${person.name}`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
}

const gallery = {
    label: 'Gallery',
    title: 'My photo gallery',
    description: `A photo collection by ${person.name}`,
    images: [
        { 
            src: '/images/gallery/img-01.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-02.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-03.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-04.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-05.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-06.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-07.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-08.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-09.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-10.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-11.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-12.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-13.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-14.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-15.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-16.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-17.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-18.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-19.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-20.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-21.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-22.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-23.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-24.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-25.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-26.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-27.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-28.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-29.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-30.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-31.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-32.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-33.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-34.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-35.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-36.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-37.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-38.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        }
    ]
}

export { person, social, home, about, blog, work, gallery };