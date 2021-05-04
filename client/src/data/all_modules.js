var data = {
    "all_modules": [
        {
            "uid": 1,
            "title": "Cities of the Future",
            "short_description": "Students envision what their communities will look like in the future, and create demonstrations that incorporate automation.",
            "tags": [
                "algorithms",
                "Scratch",
                "plugged"
            ],
            "toothpick": "Creating an interactive public art exhibit using AI tools.",
            "driving_question": "driving question todo",
            "project_question": "project question todo",
            "numWeeks": 1,
            "daysInWeek": 20,
            "resources": [
                {
                    "url": "/sandwich/1/image.png",
                    "text": "Sandwich picture.",
                },
                {
                    "url": "/sandwich/1/test.pdf",
                    "text": "Here's a PDF!",
                }
            ],
            weekly_hours: [5, 5, 5],
            // TODO: think about how to represent fillings. Will they be stored in another file and linked via id?
            // For now, view these entries as stubs.
            "fillings": [
                {
                    id: "filling-launch",
                    title: "Project Launch",
                    type: "top-bun",
                    isRequired: true,
                    suggested_day: 0,
                    duration: 15,
                },
                {
                    id: "filling-intro-to-qft",
                    title: "Intro to QFT",
                    type: "top-bun",
                    isRequired: true,
                    suggested_day: 5,
                    duration: 15,
                },
                {
                    id: "filling-intro-machine-percept",
                    title: "Intro to machine perception",
                    type: "filling",
                    isRequired: true,
                    suggested_day: 3,
                    duration: 15,

                },
                {
                    id: "filling-comm-preso",
                    title: "Community Presentation",
                    type: "bottom-bun",
                    isRequired: true,
                    suggested_week: 0,
                    suggested_day: 8,
                    duration: 15,

                },
                {
                    id: "filling-debugging",
                    title: "Intro to Debugging",
                    type: "filling",
                    isRequired: false,
                    suggested_day: 2,
                    duration: 15,

                },
                {
                    id: "filling-fine-tuning-models",
                    title: "Fine-tuning models",
                    type: "filling",
                    isRequired: false,
                    suggested_day: 6,
                    duration: 15,

                },
                {
                    id: "filling-testing-models",
                    title: "Testing your model",
                    type: "filling",
                    isRequired: false,
                    suggested_day: 7,
                    duration: 15,

                },
                {
                    id: "filling-bias",
                    title: "Bias activity",
                    type: "filling",
                    isRequired: false,
                    suggested_day: 1,
                    duration: 15,

                }

            ],
            "learning_goals": {
                knowledge: { // 1st level category
                    title: "Knowledge",
                    goals: [ // 2nd level category
                        {
                            title: "Perception", // atomic learning goal
                            type: "AI",
                            description: "Explain how images &/or audio is perceived from the surroundings and represented digitally in a computer.",
                            subgoals: [ // learning goal subgoals
                                "Computers used sensors to perceive the world around them: cameras are used to sense images and microphones are used to sense sounds from the environment.",
                                "Images are encoded as 2D arrays of pixels, where each pixel is a number indicating the brightness of that piece of the image, or an RGB value indicating the brightness of the red, green, and blue components of that piece",
                                "Sounds are digitally encoded by sampling the waveform at discrete points (typically several thousand samples per second), yielding a series of numbers.",

                            ]
                        },
                        {
                            title: "Learning",
                            type: "AI",
                            description: "Explain how machines classify two different types of media from a dataset. ",
                            subgoals: [
                                "Computers take collections of media (such as images) as input datasets.",
                                "Computers learn to identify visual features in the images to learn to form classes or categories of images from this training data.",
                            ]
                        },
                        {
                            title: "Natural Interaction",
                            type: "AI",
                            description: "Explain how humans and machines interact with each other and the kinds of knowledge that machines require to interact with humans",
                            subgoals: [
                                "Identify what data computers use to interact with humans",
                            ]
                        }
                    ]

                },
                skills: {
                    title: "Skills",
                    goals: [
                        {
                            title: "Stakeholders",
                            type: "DT",
                            description: "Identify stakeholders and their needs and goals. Gather information from users and other sources that will help them understand the experiences, emotions, and motivations of users.",
                            subgoals: [],
                        }
                    ]
                },
                attitudes: {
                    title: "Attitudes",
                    goals: [],
                }
            },
            "suggested_condiments": [1, 2],
            "example_student_projects": [
                {
                    "title": "Example Student Project 1",
                    "url": "/studentproject/1"
                }
            ]
        },
        {
            "uid": 2,
            "title": "Interactive Public Art",
            "short_description": "Students explore AI tools that meld creativity and technology and partner with stakeholders in their community to design and create a public art installation.",
            "tags": [
                "algorithms",
                "Scratch",
                "plugged"
            ],
            "toothpick": "Creating an interactive public art exhibit using AI tools.",
            "driving_question": "driving question todo",
            "project_question": "project question todo",
            "learning_goals": {
                knowledge: { // 1st level category
                    title: "Knowledge",
                    goals: [ // 2nd level category
                        {
                            title: "Perception", // atomic learning goal
                            type: "AI",
                            description: "Explain how images &/or audio is perceived from the surroundings and represented digitally in a computer.",
                            subgoals: [ // learning goal subgoals
                                "Computers used sensors to perceive the world around them: cameras are used to sense images and microphones are used to sense sounds from the environment.",
                                "Images are encoded as 2D arrays of pixels, where each pixel is a number indicating the brightness of that piece of the image, or an RGB value indicating the brightness of the red, green, and blue components of that piece",
                                "Sounds are digitally encoded by sampling the waveform at discrete points (typically several thousand samples per second), yielding a series of numbers.",

                            ]
                        },
                        {
                            title: "Learning",
                            type: "AI",
                            description: "Explain how machines classify two different types of media from a dataset. ",
                            subgoals: [
                                "Computers take collections of media (such as images) as input datasets.",
                                "Computers learn to identify visual features in the images to learn to form classes or categories of images from this training data.",
                            ]
                        },
                        {
                            title: "Natural Interaction",
                            type: "AI",
                            description: "Explain how humans and machines interact with each other and the kinds of knowledge that machines require to interact with humans",
                            subgoals: [
                                "Identify what data computers use to interact with humans",
                            ]
                        }
                    ]

                },
                skills: {
                    title: "Skills",
                    goals: [
                        {
                            title: "Stakeholders",
                            type: "DT",
                            description: "Identify stakeholders and their needs and goals. Gather information from users and other sources that will help them understand the experiences, emotions, and motivations of users.",
                            subgoals: [],
                        }
                    ]
                },
                attitudes: {
                    title: "Attitudes",
                    goals: [ {
                        title: "Students will identify more as AI creators",
                        type: "",
                        description: "",
                        subgoals: [],
                    }],
                }
            },
            "numWeeks": 5,
            "daysInWeek": 3,
            "resources": [
                {
                    "url": "/sandwich/1/image.png",
                    "text": "Sandwich picture.",
                },
                {
                    "url": "/sandwich/1/test.pdf",
                    "text": "Here's a PDF!",
                }
            ],
            weekly_hours: [5, 5, 5],
            // TODO: think about how to represent fillings. Will they be stored in another file and linked via id?
            // For now, view these entries as stubs.
            "fillings": [
                {
                    id: "filling-launch",
                    title: "Project Launch",
                    type: "top-bun",
                    isRequired: true,
                    suggested_day: 0,
                    duration: 15,
                },
                {
                    id: "filling-intro-to-qft",
                    title: "Intro to QFT",
                    type: "top-bun",
                    isRequired: true,
                    suggested_day: 5,
                    duration: 15,
                },
                {
                    id: "filling-intro-machine-percept",
                    title: "Intro to machine perception",
                    type: "filling",
                    isRequired: true,
                    suggested_day: 3,
                    duration: 15,

                },
                {
                    id: "filling-comm-preso",
                    title: "Community Presentation",
                    type: "bottom-bun",
                    isRequired: true,
                    suggested_week: 0,
                    suggested_day: 8,
                    duration: 15,

                },
                {
                    id: "filling-debugging",
                    title: "Intro to Debugging",
                    type: "filling",
                    isRequired: false,
                    suggested_day: 2,
                    duration: 15,

                },
                {
                    id: "filling-fine-tuning-models",
                    title: "Fine-tuning models",
                    type: "filling",
                    isRequired: false,
                    suggested_day: 6,
                    duration: 15,

                },
                {
                    id: "filling-testing-models",
                    title: "Testing your model",
                    type: "filling",
                    isRequired: false,
                    suggested_day: 7,
                    duration: 15,

                },
                {
                    id: "filling-bias",
                    title: "Bias activity",
                    type: "filling",
                    isRequired: false,
                    suggested_day: 1,
                    duration: 15,

                }

            ],
            "suggested_condiments": [1, 2],
            "example_student_projects": [
                {
                    "title": "Example Student Project 1",
                    "url": "/studentproject/1"
                }
            ]
        },
        // {
        //     "uid": 2,
        //     "title": "Creativity & AI",
        //     "numSlots": 10,
        //     "tags": [
        //         "algorithms",
        //         "Scratch",
        //         "Teachable Machines"
        //     ],
        //     "resources": [],
        //     "suggested_condiments": [2],
        //     "optional_teacher_fillings" : [ // teacher-curated fillings
        //         {
        //             "title": "Fine-tuning models",
        //             "difficulty": "intermediate",
        //             "ordering": [8, 12],
        //         },
        //         {
        //             "title": "Testing your model",
        //             "difficulty": "beginner",
        //         },
        //         {
        //             "title": "Bias activity",
        //             "difficulty": "beginner",
        //         }

        //     ],
        // },
        // {
        //     "uid": 3,
        //     "title": "Debugging Detective",
        //     "numSlots": 10,
        //     "tags": [
        //         "debugging",
        //         "Scratch",
        //         "human skills"
        //     ],
        //     "resources": [],
        //     "suggested_condiments": [1,3],
        // },
        // {
        //     "uid": 4,
        //     "title": "DAILY AI",
        //     "numSlots": 10,
        //     "tags": [
        //         "AI"
        //     ],
        //     "resources": [],
        //     "suggested_condiments": [1],
        // },
        // {
        //     "uid": 5,
        //     "title": "Design Thinking Bootcamp",
        //     "numSlots": 10,
        //     "tags": [
        //         "human skills"
        //     ],
        //     "resources": [],
        // },
        // {
        //     "uid": 6,
        //     "title": "Robot Race",
        //     "numSlots": 10,
        //     "tags": [
        //         "debugging",
        //         "Scratch",
        //         "human skills"
        //     ],
        //     "resources": [],
        //     "suggested_condiments": [3],
        // },
        // {
        //     "uid": 7,
        //     "title": "Seafloor Cleanup",
        //     "numSlots": 10,
        //     "tags": [
        //         "debugging",
        //         "Scratch",
        //         "human skills"
        //     ],
        //     "resources": [],
        // }
    ]
};

export default data;
