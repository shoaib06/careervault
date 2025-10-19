// FILE: resources/js/components/ExperienceForm.jsx
import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

export const ExperienceForm = ({ experiences = [], resumeId, onAdd, onUpdate, onDelete }) => {
    const [formData, setFormData] = useState({
        job_title: '',
        company: '',
        start_date: '',
        end_date: '',
        currently_working: false,
        description: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            ...formData,
            resume_id: resumeId,
        });
        setFormData({
            job_title: '',
            company: '',
            start_date: '',
            end_date: '',
            currently_working: false,
            description: '',
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Experience</h3>
            </div>

            {/* Add Form */}
            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                        <input
                            type="text"
                            name="job_title"
                            value={formData.job_title}
                            onChange={handleChange}
                            placeholder="Senior Software Engineer"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Company Name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date (MM/YYYY) *</label>
                        <input
                            type="text"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            placeholder="01/2020"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date (MM/YYYY)</label>
                        <input
                            type="text"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            placeholder="12/2023"
                            disabled={formData.currently_working}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="currently_working"
                        name="currently_working"
                        checked={formData.currently_working}
                        onChange={handleChange}
                        className="w-4 h-4 rounded"
                    />
                    <label htmlFor="currently_working" className="text-sm font-medium text-gray-700">
                        Currently working here
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="• Developed features using React and Node.js&#10;• Improved performance by 40%&#10;• Led team of 3 developers"
                        rows="4"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-vertical"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
                >
                    <Plus size={18} /> Add Experience
                </button>
            </form>

            {/* List */}
            <div className="space-y-3">
                {experiences.map(exp => (
                    <div key={exp.id} className="bg-white border border-gray-200 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-semibold text-gray-800">{exp.job_title}</h4>
                                <p className="text-sm text-gray-600">{exp.company}</p>
                                <p className="text-xs text-gray-500">{exp.start_date} – {exp.currently_working ? 'Present' : exp.end_date}</p>
                            </div>
                            <button
                                onClick={() => onDelete(exp.id)}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-line">{exp.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceForm;
