<?php

namespace App\Http\Controllers\Api;

use App\Models\Resume;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ResumeResource;

class ResumeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $resumes = auth()->user()->resumes()->latest()->get();
        return ResumeResource::collection($resumes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string',
            'location' => 'nullable|string',
            'linkedin' => 'nullable|url',
            'github' => 'nullable|url',
            'summary' => 'nullable|string'
        ]);

        $resume = auth()->user()->resumes()->create($validated);

        return new ResumeResource($resume);
    }

    public function show(Resume $resume)
    {
        $this->authorize('view', $resume);
        return new ResumeResource($resume->load(['experiences', 'projects', 'skills', 'educations', 'certifications']));
    }

    public function update(Request $request, Resume $resume)
    {
        $this->authorize('update', $resume);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string',
            'location' => 'nullable|string',
            'linkedin' => 'nullable|url',
            'github' => 'nullable|url',
            'summary' => 'nullable|string'
        ]);

        $resume->update($validated);

        return new ResumeResource($resume);
    }

    public function destroy(Resume $resume)
    {
        $this->authorize('delete', $resume);
        $resume->delete();

        return response()->json(null, 204);
    }
}
