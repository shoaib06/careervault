// FILE: resources/js/components/ProjectForm.jsx
import React, { useState } from 'react';
import { Trash2, Plus, AlertCircle, ExternalLink, Github } from 'lucide-react';

export const ProjectForm = ({ projects = [], resumeId, onAdd, onDelete }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        technologies: '',
        link: '',
    });

    const [showForm, setShowForm] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Project name is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (formData.link && !isValidUrl(formData.link)) {
            newErrors.link = 'Please enter a valid URL';
        }

        return newErrors;
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (!resumeId) {
            alert('Please save your resume first');
            return;
        }

        onAdd({
            ...formData,
            resume_id: resumeId,
        });

        setFormData({ name: '', description: '', technologies: '', link: '' });
        setShowForm(false);
        setErrors({});
    };

    const handleReset = () => {
        setFormData({ name: '', description: '', technologies: '', link: '' });
        setShowForm(false);
        setErrors({});
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">Projects</h3>
                    <p className="text-sm text-gray-600 mt-1">Showcase your best work and portfolio projects</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition"
                    >
                        <Plus size={18} /> Add Project
                    </button>
                )}
            </div>

            {/* Add Project Form */}
            {showForm && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200 space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">Add New Project</h4>

                    {/* Project Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., E-Commerce Platform, Task Manager App"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle size={14} /> {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Project Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Link (GitHub/Demo)
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-3 text-gray-400">
                                <Github size={18} />
                            </div>
                            <input
                                type="url"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                placeholder="https://github.com/username/project"
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                                    errors.link ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                            />
                        </div>
                        {errors.link && (
                            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle size={14} /> {errors.link}
                            </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Include https:// in the URL</p>
                    </div>

                    {/* Technologies */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Technologies Used
                        </label>
                        <input
                            type="text"
                            name="technologies"
                            value={formData.technologies}
                            onChange={handleChange}
                            placeholder="React, Node.js, MongoDB, Docker, PostgreSQL"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description & Key Features *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder={`Full-stack e-commerce platform with payment integration
• Built with React, Node.js, MongoDB
• Real-time inventory management
• 5000+ active users
• Increased sales by 40%`}
                            rows="5"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-vertical ${
                                errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                        />
                        {errors.description && (
                            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle size={14} /> {errors.description}
                            </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Use bullet points for key features</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                        >
                            <Plus size={18} /> Add Project
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Projects List */}
            {projects.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <ExternalLink size={40} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 mb-2">No projects added yet</p>
                    <p className="text-gray-500 text-sm mb-4">Add your projects to showcase your portfolio</p>
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                        >
                            Add Your First Project
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {projects.map((proj, index) => (
                        <div
                            key={proj.id}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                        >
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-white flex justify-between items-start">
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg">{proj.name}</h4>
                                </div>
                                <button
                                    onClick={() => onDelete(proj.id)}
                                    className="text-white hover:bg-red-600 rounded-lg p-2 transition"
                                    title="Delete project"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {/* Card Body */}
                            <div className="px-6 py-4 space-y-3">
                                {/* Technologies */}
                                {proj.technologies && (
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 mb-1">TECHNOLOGIES</p>
                                        <div className="flex flex-wrap gap-2">
                                            {proj.technologies.split(',').map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                                                >
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Description */}
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 mb-1">DESCRIPTION</p>
                                    <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                        {proj.description}
                                    </p>
                                </div>

                                {/* Link */}
                                {proj.link && (
                                    <div>
                                        <a
                                            href={proj.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm mt-2"
                                        >
                                            <ExternalLink size={16} />
                                            View Project
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Card Footer */}
                            <div className="bg-gray-50 px-6 py-3 flex justify-between items-center text-xs text-gray-600">
                                <span>Project #{index + 1}</span>
                                <span>{new Date(proj.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Another Button */}
            {projects.length > 0 && !showForm && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition"
                    >
                        <Plus size={18} /> Add Another Project
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectForm;





