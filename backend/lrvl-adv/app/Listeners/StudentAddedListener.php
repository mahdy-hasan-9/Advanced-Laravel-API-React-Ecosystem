<?php

namespace App\Listeners;

use App\Events\StudentAdded;
use App\Models\User;
use App\Notifications\StudentAddedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

/**
 * Listens for the StudentAdded event and notifies admin/manager users.
 * Runs on the queue so the HTTP response isn't delayed.
 */
class StudentAddedListener implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(StudentAdded $event): void
    {
        $recipients = User::whereIn('role', ['admin', 'manager'])->get();

        foreach ($recipients as $recipient) {
            $recipient->notify(new StudentAddedNotification($event->student));
        }
    }
}
