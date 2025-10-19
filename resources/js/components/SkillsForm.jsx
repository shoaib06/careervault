// FILE: resources/js/components/SkillsForm.jsx
import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

export const SkillsForm = ({ skills = [], resumeId, onAdd, onDelete }) => {
    const [formData, setFormData] = useState({
        category: '',
        items: '',
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
        setFormData({ category: '', items: '' });
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills</h3>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4 border border-gray-200">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="e.g., Programming Languages, Frameworks, Tools"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated) *</label>
                    <input
                        type="text"
                        name="items"
                        value={formData.items}
                        onChange={handleChange}
                        placeholder="JavaScript, Python, React, Node.js, Docker"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
                >
                    <Plus size={18} /> Add Skill Category
                </button>
            </form>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skills.map(skill => (
                    <div key={skill.id} className="bg-white border border-gray-200 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800">{skill.category}</h4>
                            <button
                                onClick={() => onDelete(skill.id)}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600">{skill.items}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsForm;
