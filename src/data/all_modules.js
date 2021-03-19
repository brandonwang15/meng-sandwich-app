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
            // TODO: think about how to represent fillings. Will they be stored in another file and linked via id?
            // For now, view these entries as stubs.
            "required_fillings": [
                {
                    "title": "Project Launch",
                    "type": "top-bun",
                    "class_num": "1",
                },
                {
                    "title": "Intro to machine perception",
                    "type": "req-filling",
                    "class_num": "2",
                },
                {
                    "title": "Client interviews",
                    "type": "req-filling",
                    "class_num": "7",
                }
            ],
            "optional_teacher_fillings" : [ // teacher-curated fillings
                {
                    "title": "Fine-tuning models",
                    "difficulty": "intermediate",
                    "ordering": [8, 12],
                },
                {
                    "title": "Testing your model",
                    "difficulty": "beginner",
                },
                {
                    "title": "Bias activity",
                    "difficulty": "beginner",
                }

            ],
            "suggested_condiments": [1,2],
            "example_student_projects": [
                {
                    "title": "Example Student Project 1",
                    "url": "/studentproject/1"
                }
            ]
        },
        {
            "uid": 2,
            "title": "Creativity & AI",
            "tags": [
                "algorithms",
                "Scratch",
                "Teachable Machines"
            ],
            "resources": [],
            "suggested_condiments": [2],

        },
        {
            "uid": 3,
            "title": "Debugging Detective",
            "tags": [
                "debugging",
                "Scratch",
                "human skills"
            ],
            "resources": [],
            "suggested_condiments": [1,3],
        },
        {
            "uid": 4,
            "title": "DAILY AI",
            "tags": [
                "AI"
            ],
            "resources": [],
            "suggested_condiments": [1],
        },
        {
            "uid": 5,
            "title": "Design Thinking Bootcamp",
            "tags": [
                "human skills"
            ],
            "resources": [],
        },
        {
            "uid": 6,
            "title": "Robot Race",
            "tags": [
                "debugging",
                "Scratch",
                "human skills"
            ],
            "resources": [],
            "suggested_condiments": [3],
        },
        {
            "uid": 7,
            "title": "Seafloor Cleanup",
            "tags": [
                "debugging",
                "Scratch",
                "human skills"
            ],
            "resources": [],
        }
    ]
};

export default data;
