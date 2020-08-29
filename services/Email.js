const nodemailer = require('nodemailer');
const emailConfig = require('../config/Email');

const transporter = nodemailer.createTransport({
	service: emailConfig.service,
	auth: {
		user: emailConfig.user,
		pass: emailConfig.pass,
	},
});

const from = 'jobfinder1.netflify.app';

async function mailCandidate(candidate, job) {
	let info = await transporter.sendMail({
		from,
		to: candidate.email,
		subject: 'Job Application Succesful',
		text: 
`
Hi ${candidate.name},

We are pleased to inform you that your job application for role "${job.title}" has been successfully applied.

Recruiter will contact you in few days if your profile match the job requirements.

Thank you!
The Recruiting Team at JobFinder
`,
	});
}

async function mailRecruiter(recruiter, candidate, job) {
	let info = await transporter.sendMail({
		from,
		to: recruiter.email,
		subject: 'New candidate application',
		text: 
`
Hi ${recruiter.name},

A new candidate "${candidate.name}" has applied to your job with title "${job.title}". 

kindly checkout your dashboard to take an action.

Thank you!
The Recruiting Team at JobFinder
`,
	});
}

module.exports = {
	mailCandidateAndRecruiter: async (candidate, recruiter, job) => {
		await mailCandidate(candidate, job);
		await mailRecruiter(recruiter, candidate, job);
	},
};
