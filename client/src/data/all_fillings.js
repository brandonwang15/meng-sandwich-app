var fillingData = {
    "filling-launch": {
        id: "filling-launch",
        title: "Project Launch",
        type: "top-bun",
        isRequired: true, // can be overridden by a sandwich
        suggested_day: 0, // can be overridden by a sandwich
        duration: 15,
        materials: {
            teacher_slides: {
                type: "googleslides",
                slides: [0, -1], // -1 represents the last slide, so [0, -1] means all slides in the presentation
                url: "https://docs.google.com/presentation/d/12svaHbSKQvc9wwbT1kcQ8N-IEAqmxjMY1HD22Tf8Gzk/edit#slide=id.gd75bc4bacc_0_87",
            },
            student_journal: {
                type: "googleslides",
                slides: [0, 5], // (inclusive, exclusive)
                url: "https://docs.google.com/presentation/d/1RI-m8wjilNdb1AZgEh1GzeznUFSnDSDLXynNkV7sq5o/edit?usp=drive_web&ouid=113731355827264814751",
            },
            teacher_plan: {
                type: "googledocs",
                pages: [0, -1],
                url: "https://docs.google.com/document/d/1Hf4XliczqF8VKLl7h7CEq9LV4wHdcjLBXIrjcIttpk0/edit",
            },
        },
    },
    "filling-intro-to-qft": {
        id: "filling-intro-to-qft",
        title: "Intro to QFT",
        type: "top-bun",
        isRequired: true,
        suggested_day: 5,
        duration: 15,
        materials: {
            teacher_slides: {
                type: "googleslides",
                slides: [0, -1], // -1 represents the last slide, so [0, -1] means all slides in the presentation
                url: "https://docs.google.com/presentation/d/12svaHbSKQvc9wwbT1kcQ8N-IEAqmxjMY1HD22Tf8Gzk/edit#slide=id.gd75bc4bacc_0_87",
            },
            student_journal: {
                type: "googleslides",
                slides: [0, 5],
                url: "https://docs.google.com/presentation/d/1RI-m8wjilNdb1AZgEh1GzeznUFSnDSDLXynNkV7sq5o/edit?usp=drive_web&ouid=113731355827264814751",
            },
            teacher_plan: {
                type: "googledocs",
                pages: [0, -1],
                url: "https://docs.google.com/document/d/1Hf4XliczqF8VKLl7h7CEq9LV4wHdcjLBXIrjcIttpk0/edit",
            },
        },
    },
    "filling-intro-machine-percept": {
        id: "filling-intro-machine-percept",
        title: "Intro to machine perception",
        type: "filling",
        isRequired: true,
        suggested_day: 3,
        duration: 15,
        materials: {
            teacher_slides: {
                type: "googleslides",
                slides: [0, -1], // -1 represents the last slide, so [0, -1] means all slides in the presentation
                url: "https://docs.google.com/presentation/d/12svaHbSKQvc9wwbT1kcQ8N-IEAqmxjMY1HD22Tf8Gzk/edit#slide=id.gd75bc4bacc_0_87",
            },
            student_journal: {
                type: "googleslides",
                slides: [0, 5],
                url: "https://docs.google.com/presentation/d/1RI-m8wjilNdb1AZgEh1GzeznUFSnDSDLXynNkV7sq5o/edit?usp=drive_web&ouid=113731355827264814751",
            },
            teacher_plan: {
                type: "googledocs",
                pages: [0, -1],
                url: "https://docs.google.com/document/d/1Hf4XliczqF8VKLl7h7CEq9LV4wHdcjLBXIrjcIttpk0/edit",
            },
        },

    },
    "filling-comm-preso": {
        id: "filling-comm-preso",
        title: "Community Presentation",
        type: "bottom-bun",
        isRequired: true,
        suggested_week: 0,
        suggested_day: 8,
        duration: 15,
        materials: {
            teacher_slides: {
                type: "googleslides",
                slides: [0, -1], // -1 represents the last slide, so [0, -1] means all slides in the presentation
                url: "https://docs.google.com/presentation/d/12svaHbSKQvc9wwbT1kcQ8N-IEAqmxjMY1HD22Tf8Gzk/edit#slide=id.gd75bc4bacc_0_87",
            },
            student_journal: {
                type: "googleslides",
                slides: [0, 5],
                url: "https://docs.google.com/presentation/d/1RI-m8wjilNdb1AZgEh1GzeznUFSnDSDLXynNkV7sq5o/edit?usp=drive_web&ouid=113731355827264814751",
            },
            teacher_plan: {
                type: "googledocs",
                pages: [0, -1],
                url: "https://docs.google.com/document/d/1Hf4XliczqF8VKLl7h7CEq9LV4wHdcjLBXIrjcIttpk0/edit",
            },
        },

    },
    "filling-debugging": {
        id: "filling-debugging",
        title: "Intro to Debugging",
        type: "filling",
        isRequired: false,
        suggested_day: 2,
        duration: 15,
        materials: {
            teacher_slides: {
                type: "googleslides",
                slides: [0, -1], // -1 represents the last slide, so [0, -1] means all slides in the presentation
                url: "https://docs.google.com/presentation/d/12svaHbSKQvc9wwbT1kcQ8N-IEAqmxjMY1HD22Tf8Gzk/edit#slide=id.gd75bc4bacc_0_87",
            },
            student_journal: {
                type: "googleslides",
                slides: [0, 5],
                url: "https://docs.google.com/presentation/d/1RI-m8wjilNdb1AZgEh1GzeznUFSnDSDLXynNkV7sq5o/edit?usp=drive_web&ouid=113731355827264814751",
            },
            teacher_plan: {
                type: "googledocs",
                pages: [0, -1],
                url: "https://docs.google.com/document/d/1Hf4XliczqF8VKLl7h7CEq9LV4wHdcjLBXIrjcIttpk0/edit",
            },
        },

    },
    "filling-fine-tuning-models": {
        id: "filling-fine-tuning-models",
        title: "Fine-tuning models",
        type: "filling",
        isRequired: false,
        suggested_day: 6,
        duration: 15,
        materials: {
            teacher_slides: {
                type: "googleslides",
                slides: [0, -1], // -1 represents the last slide, so [0, -1] means all slides in the presentation
                url: "https://docs.google.com/presentation/d/12svaHbSKQvc9wwbT1kcQ8N-IEAqmxjMY1HD22Tf8Gzk/edit#slide=id.gd75bc4bacc_0_87",
            },
            student_journal: {
                type: "googleslides",
                slides: [0, 5],
                url: "https://docs.google.com/presentation/d/1RI-m8wjilNdb1AZgEh1GzeznUFSnDSDLXynNkV7sq5o/edit?usp=drive_web&ouid=113731355827264814751",
            },
            teacher_plan: {
                type: "googledocs",
                pages: [0, -1],
                url: "https://docs.google.com/document/d/1Hf4XliczqF8VKLl7h7CEq9LV4wHdcjLBXIrjcIttpk0/edit",
            },
        },

    },
    "filling-testing-models": {
        id: "filling-testing-models",
        title: "Testing your model",
        type: "filling",
        isRequired: false,
        suggested_day: 7,
        duration: 15,
        materials: {
            teacher_slides: {
                type: "googleslides",
                slides: [0, -1], // -1 represents the last slide, so [0, -1] means all slides in the presentation
                url: "https://docs.google.com/presentation/d/12svaHbSKQvc9wwbT1kcQ8N-IEAqmxjMY1HD22Tf8Gzk/edit#slide=id.gd75bc4bacc_0_87",
            },
            student_journal: {
                type: "googleslides",
                slides: [0, 5],
                url: "https://docs.google.com/presentation/d/1RI-m8wjilNdb1AZgEh1GzeznUFSnDSDLXynNkV7sq5o/edit?usp=drive_web&ouid=113731355827264814751",
            },
            teacher_plan: {
                type: "googledocs",
                pages: [0, -1],
                url: "https://docs.google.com/document/d/1Hf4XliczqF8VKLl7h7CEq9LV4wHdcjLBXIrjcIttpk0/edit",
            },
        },

    },
    "filling-bias": {
        id: "filling-bias",
        title: "Bias activity",
        type: "filling",
        isRequired: false,
        suggested_day: 1,
        duration: 15,
        materials: {
            teacher_slides: {
                type: "googleslides",
                slides: [0, -1], // -1 represents the last slide, so [0, -1] means all slides in the presentation
                url: "https://docs.google.com/presentation/d/12svaHbSKQvc9wwbT1kcQ8N-IEAqmxjMY1HD22Tf8Gzk/edit#slide=id.gd75bc4bacc_0_87",
            },
            student_journal: {
                type: "googleslides",
                slides: [0, 5],
                url: "https://docs.google.com/presentation/d/1RI-m8wjilNdb1AZgEh1GzeznUFSnDSDLXynNkV7sq5o/edit?usp=drive_web&ouid=113731355827264814751",
            },
            teacher_plan: {
                type: "googledocs",
                pages: [0, -1],
                url: "https://docs.google.com/document/d/1Hf4XliczqF8VKLl7h7CEq9LV4wHdcjLBXIrjcIttpk0/edit",
            },
        },

    }


}

export default fillingData;