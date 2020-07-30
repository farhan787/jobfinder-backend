const nodemailer = require('nodemailer');
const emailConfig = require('../config/Email');

const transporter = nodemailer.createTransport({
	host: emailConfig.host,
	port: emailConfig.port,
	secure: emailConfig.secure,
	auth: {
		user: emailConfig.user,
		pass: emailConfig.pass,
	},
});

const from = 'jobfinder.org.com';

async function mailCandidate(candidate, job) {
	let info = await transporter.sendMail({
		from,
		to: candidate.email,
		subject: 'Job Application Succesful',
		text: `Hi ${candidate.name},
		We are pleased to inform you that your job application for role "${job.title}" has been successfully applied. Recruiter will contact you in few days if your profile match the job requirements.
		`,
	});
}

async function mailRecruiter(recruiter, candidate, job) {
	let info = await transporter.sendMail({
		from,
		to: recruiter.email,
		subject: 'New candidate application',
		text: `Hi ${recruiter.name},
		A new candidate "${candidate.name}" has applied to your job with title "${job.title}". kindly checkout your dashboard to take an action.
		`,
	});
}

module.exports = {
	mailCandidateAndRecruiter: async (candidate, recruiter, job) => {
		console.log(emailConfig);
		await mailCandidate(candidate, job);
		await mailRecruiter(recruiter, candidate, job);
	},
};
