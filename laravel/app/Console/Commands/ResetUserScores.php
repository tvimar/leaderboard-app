<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ResetUserScores extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:reset-scores {--force : Force the operation without confirmation}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset the score of all users to 0';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (!$this->option('force') && !$this->confirm('Are you sure you want to reset all user scores to 0?')) {
            $this->info('Operation cancelled.');
            return;
        }

        $userCount = User::count();
        
        if ($userCount === 0) {
            $this->info('No users found in the database.');
            return;
        }

        $this->output->progressStart($userCount);

        User::chunk(100, function ($users) {
            foreach ($users as $user) {
                $user->score = 0;
                $user->save();
                $this->output->progressAdvance();
            }
        });

        $this->output->progressFinish();
        $this->info("Successfully reset scores for {$userCount} users.");
    }
}
