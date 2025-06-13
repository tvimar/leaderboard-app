<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Winner;
use App\Jobs\GenerateUserQrCode;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'age' => 'required|integer|min:0',
            'address' => 'required|max:255'
        ]);

        $user = User::create($validatedData);

        $user->score = 0; // Initialize score to 0 
        $user->save();

        // Call GenerateUserQrCode job to generate QR code
        GenerateUserQrCode::dispatch($user->id, $user->address);

        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'score' => 'sometimes|required|integer|min:0'
        ]);

        $user->update($validatedData);

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }

    /**
     * Return a JSON response with users grouped by score.
     * Each group contains an array of user names and the average age of users in that group.
     */
    public function getUsersGroupedByScore()
    {
        $users = User::all()->groupBy('score');
        $result = [];

        foreach ($users as $score => $group) {
            $names = $group->pluck('name')->all();
            $averageAge = $group->avg('age');
            $result[$score] = [
                'names' => $names,
                'average_age' => round($averageAge, 2),
            ];
        }

        return response()->json($result);
    }

    /**
     * Return the user with the highest score.
     * If there is a tie, return null.
     */
    public function currentWinner()
    {
        // Grab the most recent entry in the winners table with user relation
        $winner = Winner::with('user')->latest()->first();

        if ($winner) {
            return response()->json([
                'winner' => $winner,
                'current_score' => $winner->user->score // Get the user's current score
            ]);
        }

        return response()->json(null);
    }
}
