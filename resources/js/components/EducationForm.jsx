// FILE: resources/js/components/EducationForm.jsx
import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

export const EducationForm = ({ educations = [], resumeId, onAdd, onDelete }) => {
    const [formData, setFormData] = useState({
        degree: '',
        field_of_study: '',
        school: '',
        graduation_year: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            ...formData,
            resume_id: resumeId,
        });
        setFormData({ degree: '', field_of_study: '', school: '', graduation_year: '' });
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Education</h3>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
                        <input
                            type="text"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            placeholder="Bachelor of Science"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                        <input
                            type="text"
                            name="field_of_study"
                            value={formData.field_of_study}
                            onChange={handleChange}
                            placeholder="Computer Science"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">School/University *</label>
                        <input
                            type="text"
                            name="school"
                            value={formData.school}
                            onChange={handleChange}
                            placeholder="University Name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                        <input
                            type="number"
                            name="graduation_year"
                            value={formData.graduation_year}
                            onChange={handleChange}
                            placeholder="2020"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
                >
                    <Plus size={18} /> Add Education
                </button>
            </form>

            {/* List */}
            <div className="space-y-3">
                {educations.map(edu => (
                    <div key={edu.id} className="bg-white border border-gray-200 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-semibold text-gray-800">{edu.school}</h4>
                                <p className="text-sm text-gray-600">{edu.degree}{edu.field_of_study ? `, ${edu.field_of_study}` : ''}</p>
                                <p className="text-xs text-gray-500">{edu.graduation_year}</p>
                            </div>
                            <button
                                onClick={() => onDelete(edu.id)}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationForm;
