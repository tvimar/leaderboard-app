<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Winner extends Model
{
    protected $fillable = ['user_id', 'name', 'score'];

    /**
     * Get the user that won this position.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
