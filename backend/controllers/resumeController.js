const Resume = require('../models/Resume');
const PDFDocument = require('pdfkit');

exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id }).populate('user', 'name email');
    if (!resume) return res.status(400).json({ msg: 'Resume not found' });

    res.json(resume);
  } catch (err) {
    res.status(500).send('Server error');
  }
}

exports.updateResume = async (req, res) => {
  const { workExperience, education, skills, achievements } = req.body;
  try {
    let resume = await Resume.findOne({ user: req.user.id });
    if (resume) {
      resume.workExperience = workExperience;
      resume.education = education;
      resume.skills = skills;
      resume.achievements = achievements;
    } else {
      resume = new Resume({
        user: req.user.id,
        workExperience,
        education,
        skills,
        achievements
      });
    }
    await resume.save();
    res.json(resume);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.exportResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id }).populate('user', 'name email');
    if (!resume) return res.status(400).json({ msg: 'Resume not found' });

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    doc.pipe(res);

    // User Information
    doc.fontSize(20).text('Resume', { align: 'center' });
    doc.moveDown();
    doc.fontSize(15).text(`Name: ${resume.user.name}`);
    doc.text(`Email: ${resume.user.email}`);
    doc.moveDown();

    // Work Experience
    doc.fontSize(15).text('Work Experience', { underline: true });
    resume.workExperience.forEach(exp => {
      doc.fontSize(12).text(`${exp.position} at ${exp.company}`);
      doc.text(`${new Date(exp.startDate).toDateString()} - ${new Date(exp.endDate).toDateString()}`);
      doc.text(exp.description);
      doc.moveDown();
    });

    // Education
    doc.fontSize(15).text('Education', { underline: true });
    resume.education.forEach(edu => {
      doc.fontSize(12).text(`${edu.degree} from ${edu.institution}`);
      doc.text(`${new Date(edu.startDate).toDateString()} - ${new Date(edu.endDate).toDateString()}`);
      doc.text(edu.description);
      doc.moveDown();
    });

    // Skills
    doc.fontSize(15).text('Skills', { underline: true });
    doc.fontSize(12).text(resume.skills.join(', '));
    doc.moveDown();

    // Achievements
    doc.fontSize(15).text('Achievements', { underline: true });
    doc.fontSize(12).text(resume.achievements.join(', '));
    
    doc.end();
  } catch (err) {
    res.status(500).send('Server error');
  }
};