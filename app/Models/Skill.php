<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Skill extends Model
{
    protected $fillable = ['resume_id', 'category', 'items', 'order'];

    public function resume(): BelongsTo
    {
        return $this->belongsTo(Resume::class);
    }
}
