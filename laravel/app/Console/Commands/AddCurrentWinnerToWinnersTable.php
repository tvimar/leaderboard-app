<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AddCurrentWinnerToWinnersTable extends Command
{
    protected $signature = 'winners:add-current-winner';
    protected $description = 'Add the user with the highest score to the winners table';

    public function handle()
    {
        $topScore = User::max('score');
        if ($topScore === null) {
            $this->info('No users found.');
            return;
        }

        $topUsers = User::where('score', $topScore)->get();

        // Only add if there is a single top user (no tie)
        if ($topUsers->count() === 1) {
            $user = $topUsers->first();
            DB::table('winners')->insert([
                'user_id' => $user->id,
                'name' => $user->name,
                'score' => $user->score,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $this->info('Winner added: ' . $user->name);
        } else {
            $this->info('Tie detected or no users. No winner added.');
        }
    }
}