// FILE: resources/js/components/ResumePreview.jsx
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export const ResumePreview = ({ resume }) => {
    if (!resume) {
        return (
            <div className="bg-white p-12 text-center text-gray-500">
                <p>Create or select a resume to view preview</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-12 text-gray-800 font-serif text-sm leading-relaxed">
            {/* Header */}
            <div className="text-center border-b-2 border-black pb-4 mb-6">
                <h1 className="text-3xl font-bold text-black mb-2">{resume.title}</h1>
                <div className="flex justify-center gap-4 text-xs flex-wrap">
                    {resume.email && (
                        <span className="flex items-center gap-1">
                            <Mail size={14} /> {resume.email}
                        </span>
                    )}
                    {resume.phone && (
                        <span className="flex items-center gap-1">
                            <Phone size={14} /> {resume.phone}
                        </span>
                    )}
                    {resume.location && (
                        <span className="flex items-center gap-1">
                            <MapPin size={14} /> {resume.location}
                        </span>
                    )}
                    {resume.linkedin && (
                        <span className="flex items-center gap-1">
                            <Linkedin size={14} /> {resume.linkedin}
                        </span>
                    )}
                    {resume.github && (
                        <span className="flex items-center gap-1">
                            <Github size={14} /> {resume.github}
                        </span>
                    )}
                </div>
            </div>

            {/* Summary */}
            {resume.summary && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-black pb-1 mb-3">Professional Summary</h2>
                    <p className="text-xs leading-relaxed">{resume.summary}</p>
                </div>
            )}

            {/* Professional Experience */}
            {resume.experiences && resume.experiences.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-black pb-1 mb-3">Professional Experience</h2>
                    {resume.experiences.map(exp => (
                        <div key={exp.id} className="mb-3">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="font-bold text-xs">{exp.job_title}</span>
                                <span className="text-xs italic">{exp.start_date} – {exp.currently_working ? 'Present' : exp.end_date}</span>
                            </div>
                            <div className="text-xs text-gray-600 mb-1">{exp.company}</div>
                            <div className="text-xs whitespace-pre-line">{exp.description}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Projects */}
            {resume.projects && resume.projects.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-black pb-1 mb-3">Projects</h2>
                    {resume.projects.map(proj => (
                        <div key={proj.id} className="mb-3">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="font-bold text-xs">{proj.name}</span>
                                {proj.link && <span className="text-xs">{proj.link}</span>}
                            </div>
                            {proj.technologies && <div className="text-xs text-gray-600 mb-1">{proj.technologies}</div>}
                            <div className="text-xs whitespace-pre-line">{proj.description}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Skills */}
            {resume.skills && resume.skills.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-black pb-1 mb-3">Skills</h2>
                    {resume.skills.map(skill => (
                        <div key={skill.id} className="text-xs mb-1">
                            <span className="font-bold">{skill.category}:</span> {skill.items}
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {resume.educations && resume.educations.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-black pb-1 mb-3">Education</h2>
                    {resume.educations.map(edu => (
                        <div key={edu.id} className="mb-3">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="font-bold text-xs">{edu.school}</span>
                                <span className="text-xs italic">{edu.graduation_year}</span>
                            </div>
                            <div className="text-xs">{edu.degree}, {edu.field_of_study}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-black pb-1 mb-3">Certifications</h2>
                    {resume.certifications.map(cert => (
                        <div key={cert.id} className="mb-2 text-xs">
                            <span className="font-bold">{cert.name}</span> - {cert.issuer} ({cert.date})
                            {cert.link && <div className="text-gray-600">{cert.link}</div>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResumePreview;
