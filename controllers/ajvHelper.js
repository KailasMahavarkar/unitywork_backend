// FILE INTRO: This file contains logic for pre-route schema validations

const AJV = require('ajv');
const { gigCategoryEnum } = require('../models/data');

const ajv = new AJV()

const baseGigValidatorObject = {
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: true
}

const baseLoginObject = {
    type: "object",
    properties: {
        username: { type: "string" },
        password: { type: "string" }
    },
    required: ["username", "password"],
}

const baseRegisterObject = {
    type: "object",
    properties: {
        email: {
            type: "string",
            minLength: 10
        },
        password: { type: "string" },
        firstname: {
            type: "string",
            minLength: 3
        },
        lastname: {
            type: "string",
            minLength: 3
        },
        username: {
            type: "string",
            minLength: 3
        },
    },
    required: ["email", "password", "firstname", "lastname", "username"],
}

const gigSchema = {
    create: {
        type: "object",
        properties: {
            title: { type: "string" },
            category: { enum: gigCategoryEnum },
            tags: { type: "array" },
            blog: {
                type: "string",
                maxLength: 2000
            },
            images: {
                type: "object",
            },
            pricings: {
                type: "object",
            },
        },
        required: [
            "title", "category", "tags", "blog", "images", "pricings"
        ],
        additionalProperties: false
    },
    update: baseGigValidatorObject,
    read: baseGigValidatorObject,
    delete: baseGigValidatorObject,
}

const validationSchema = {
    create: {
        type: "object",
        properties: {
            firstname: { type: "string" },
            lastname: { type: "string" },
            email: { type: "string" },
            description: { type: "string" },

            govtIdCard: { type: "object" },
            selfieGovtIdCard: { type: "object" },
            country: { type: "string" },
        },
        additionalProperties: false,
        required: [
            "firstname", "lastname", "email",
            "description",
            "country", "govtIdCard", "selfieGovtIdCard"
        ]
    }
}


const profileSchema = {
    update: {
        type: "object",
        properties: {
            firstname: { type: "string" },
            lastname: { type: "string" },
            description: { type: "string" },
            location: { type: "string" },
            education: { type: "string" },
            job: { type: "string" },
            avatar: { type: "object" },
        },
        additionalProperties: false,
        required: [
            "firstname", "lastname", "description", "location", "education", "job", "avatar"
        ]
    }
}

const authSchema = {
    login: baseLoginObject,
    register: baseRegisterObject,
}

// validators
const gigAJV = {
    gigCreate: (data) => ajv.validate(gigSchema.create, data),
    gigRead: (data) => ajv.validate(gigSchema.read, data),
    gigUpdate: (data) => ajv.validate(gigSchema.update, data),
    gigDelete: (data) => ajv.validate(gigSchema.delete, data)
}


// auth validators
const authAJV = {
    login: (data) => ajv.validate(authSchema.login, data),
    register: (data) => ajv.validate(authSchema.register, data),
}

// seller verification validators
const verificationAJV = {
    create: (data) => ajv.validate(validationSchema.create, data),
}

// profile validators
const profileAJV = {
    update: (data) => ajv.validate(profileSchema.update, data),
}




const handleAJVError = (res) => {

    const ajvError = ajv.errors?.map((err) => {
        return {
            key: err.instancePath.split("/")[1],
            message: err.message,
            params: err.params,
        };
    });

    return res.status(400).json({
        message: "malformed input",
        status: "failed",
        errors: ajvError
    })
}

module.exports = {
    ajv,
    gigAJV,
    authAJV,
    profileAJV,
    verificationAJV,
    gigSchema,
    handleAJVError
}