// FILE: resources/js/components/ResumeBuilder.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, AlertCircle, Loader, Download, Eye } from 'lucide-react';
import { useResume } from '../hooks/useResume';
import { resumeAPI, experienceAPI, projectAPI, skillAPI, educationAPI, certificationAPI } from '../services/api';
import ResumeBasicInfo from './ResumeBasicInfo';
import ExperienceForm from './ExperienceForm';
import ProjectForm from './ProjectForm';
import SkillsForm from './SkillsForm';
import EducationForm from './EducationForm';
import CertificationForm from './CertificationForm';
import ResumePreview from './ResumePreview';

export const ResumeBuilder = () => {
    const { id: resumeId } = useParams();
    const navigate = useNavigate();
    const { resume, loading, error: fetchError, fetchResume, updateResume: apiUpdateResume, createResume: apiCreateResume } = useResume(resumeId);

    const [formData, setFormData] = useState({
        title: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        summary: '',
    });

    const [activeTab, setActiveTab] = useState('basic');
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    // Load resume data when fetched
    useEffect(() => {
        if (resume) {
            setFormData({
                title: resume.title || '',
                email: resume.email || '',
                phone: resume.phone || '',
                location: resume.location || '',
                linkedin: resume.linkedin || '',
                github: resume.github || '',
                summary: resume.summary || '',
            });
        }
    }, [resume]);

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 4000);
    };

    const handleSave = async () => {
        setSaving(true);
        setErrors({});
        try {
            if (resumeId) {
                await apiUpdateResume(resumeId, formData);
            } else {
                const newResume = await apiCreateResume(formData);
                navigate(`/resume-builder/${newResume.id}`);
            }
            showMessage('success', 'Resume saved successfully!');
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
            showMessage('error', err.response?.data?.message || 'Error saving resume');
        } finally {
            setSaving(false);
        }
    };

    const handleAddExperience = async (data) => {
        try {
            await experienceAPI.create(data);
            if (resumeId) {
                await fetchResume(resumeId);
            }
            showMessage('success', 'Experience added successfully!');
        } catch (err) {
            showMessage('error', 'Error adding experience');
        }
    };

    const handleDeleteExperience = async (id) => {
        if (window.confirm('Are you sure you want to delete this experience?')) {
            try {
                await experienceAPI.delete(id);
                if (resumeId) {
                    await fetchResume(resumeId);
                }
                showMessage('success', 'Experience deleted!');
            } catch (err) {
                showMessage('error', 'Error deleting experience');
            }
        }
    };

    const handleAddProject = async (data) => {
        try {
            await projectAPI.create(data);
            if (resumeId) {
                await fetchResume(resumeId);
            }
            showMessage('success', 'Project added successfully!');
        } catch (err) {
            showMessage('error', 'Error adding project');
        }
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await projectAPI.delete(id);
                if (resumeId) {
                    await fetchResume(resumeId);
                }
                showMessage('success', 'Project deleted!');
            } catch (err) {
                showMessage('error', 'Error deleting project');
            }
        }
    };

    const handleAddSkill = async (data) => {
        try {
            await skillAPI.create(data);
            if (resumeId) {
                await fetchResume(resumeId);
            }
            showMessage('success', 'Skill added successfully!');
        } catch (err) {
            showMessage('error', 'Error adding skill');
        }
    };

    const handleDeleteSkill = async (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                await skillAPI.delete(id);
                if (resumeId) {
                    await fetchResume(resumeId);
                }
                showMessage('success', 'Skill deleted!');
            } catch (err) {
                showMessage('error', 'Error deleting skill');
            }
        }
    };

    const handleAddEducation = async (data) => {
        try {
            await educationAPI.create(data);
            if (resumeId) {
                await fetchResume(resumeId);
            }
            showMessage('success', 'Education added successfully!');
        } catch (err) {
            showMessage('error', 'Error adding education');
        }
    };

    const handleDeleteEducation = async (id) => {
        if (window.confirm('Are you sure you want to delete this education?')) {
            try {
                await educationAPI.delete(id);
                if (resumeId) {
                    await fetchResume(resumeId);
                }
                showMessage('success', 'Education deleted!');
            } catch (err) {
                showMessage('error', 'Error deleting education');
            }
        }
    };

    const handleAddCertification = async (data) => {
        try {
            await certificationAPI.create(data);
            if (resumeId) {
                await fetchResume(resumeId);
            }
            showMessage('success', 'Certification added successfully!');
        } catch (err) {
            showMessage('error', 'Error adding certification');
        }
    };

    const handleDeleteCertification = async (id) => {
        if (window.confirm('Are you sure you want to delete this certification?')) {
            try {
                await certificationAPI.delete(id);
                if (resumeId) {
                    await fetchResume(resumeId);
                }
                showMessage('success', 'Certification deleted!');
            } catch (err) {
                showMessage('error', 'Error deleting certification');
            }
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        // This will be implemented with jsPDF
        showMessage('info', 'PDF download coming soon!');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-3">
                    <Loader className="animate-spin text-blue-600" size={40} />
                    <p className="text-gray-600">Loading resume...</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'basic', label: 'Personal Info' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
        { id: 'education', label: 'Education' },
        { id: 'certifications', label: 'Certifications' },
    ];

    const previewData = {
        ...formData,
        experiences: resume?.experiences || [],
        projects: resume?.projects || [],
        skills: resume?.skills || [],
        educations: resume?.educations || [],
        certifications: resume?.certifications || [],
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
                        <p className="text-gray-600 text-sm mt-1">
                            {resumeId ? `Editing: ${formData.title}` : 'Create your professional resume'}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handlePrint}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
                        >
                            🖨️ Print
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
                        >
                            <Download size={18} />
                            PDF
                        </button>
                        <button
                            onClick={() => setShowPreviewModal(!showPreviewModal)}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
                        >
                            <Eye size={18} />
                            Preview
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2 transition"
                        >
                            <Save size={18} />
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages */}
            {message.text && (
                <div className={`${message.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : message.type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-blue-100 border-blue-400 text-blue-700'} border-l-4 p-4 mx-4 mt-4 flex items-center gap-2 rounded`}>
                    <AlertCircle size={20} />
                    {message.text}
                </div>
            )}

            {fetchError && (
                <div className="bg-red-100 border-red-400 text-red-700 border-l-4 p-4 mx-4 mt-4 flex items-center gap-2 rounded">
                    <AlertCircle size={20} />
                    {fetchError}
                </div>
            )}

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 px-4 pb-12">
                {/* Form Section */}
                <div className="lg:col-span-2">
                    {/* Tabs */}
                    <div className="bg-white rounded-t-lg shadow overflow-x-auto">
                        <div className="flex border-b">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-3 font-medium whitespace-nowrap transition text-sm ${activeTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white shadow rounded-b-lg p-6">
                        {activeTab === 'basic' && (
                            <ResumeBasicInfo
                                resume={formData}
                                onChange={setFormData}
                                errors={errors}
                            />
                        )}
                        {activeTab === 'experience' && (
                            <ExperienceForm
                                experiences={resume?.experiences || []}
                                resumeId={resumeId}
                                onAdd={handleAddExperience}
                                onDelete={handleDeleteExperience}
                            />
                        )}
                        {activeTab === 'projects' && (
                            <ProjectForm
                                projects={resume?.projects || []}
                                resumeId={resumeId}
                                onAdd={handleAddProject}
                                onDelete={handleDeleteProject}
                            />
                        )}
                        {activeTab === 'skills' && (
                            <SkillsForm
                                skills={resume?.skills || []}
                                resumeId={resumeId}
                                onAdd={handleAddSkill}
                                onDelete={handleDeleteSkill}
                            />
                        )}
                        {activeTab === 'education' && (
                            <EducationForm
                                educations={resume?.educations || []}
                                resumeId={resumeId}
                                onAdd={handleAddEducation}
                                onDelete={handleDeleteEducation}
                            />
                        )}
                        {activeTab === 'certifications' && (
                            <CertificationForm
                                certifications={resume?.certifications || []}
                                resumeId={resumeId}
                                onAdd={handleAddCertification}
                                onDelete={handleDeleteCertification}
                            />
                        )}
                    </div>
                </div>

                {/* Preview Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow overflow-hidden sticky top-24">
                        <div className="bg-gray-800 text-white p-4">
                            <h2 className="text-lg font-semibold">Live Preview</h2>
                            <p className="text-gray-300 text-sm">ATS-Optimized</p>
                        </div>
                        <div className="overflow-y-auto max-h-[calc(100vh-200px)] bg-gray-50">
                            <div className="p-3">
                                <div className="bg-white border border-gray-300 rounded p-4 text-xs leading-relaxed" style={{ fontSize: '10px' }}>
                                    <ResumePreview resume={previewData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Screen Preview Modal */}
            {showPreviewModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Full Preview</h2>
                            <button
                                onClick={() => setShowPreviewModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        <div className="p-8">
                            <ResumePreview resume={previewData} />
                        </div>
                    </div>
                </div>
            )}

            {/* Print Styles */}
            <style>{`
                @media print {
                    body {
                        background: white;
                        margin: 0;
                        padding: 0;
                    }
                    .bg-gray-100,
                    [class*="shadow"],
                    button,
                    nav,
                    .sticky,
                    .max-w-7xl {
                        display: none !important;
                    }
                    .lg\\:col-span-2 {
                        display: none !important;
                    }
                    .lg\\:col-span-1 {
                        grid-column: span 1 !important;
                        position: static !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ResumeBuilder;
