<?php

namespace App\Notifications;

use App\Models\Student;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

/**
 * Notification sent to admin/manager users when a new student is added.
 * Channels: database (persistent) + broadcast (real-time via Reverb).
 */
class StudentAddedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public readonly Student $student) {}

    /**
     * Deliver via database (for history) and broadcast (for real-time push).
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Data stored in the `notifications` table.
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'heading'     => 'New Student Enrolled',
            'description' => "Student {$this->student->name} has been added successfully.",
            'student_id'  => $this->student->id,
        ];
    }

    /**
     * Payload pushed via Reverb to the private user channel.
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'id'          => $this->id,
            'heading'     => 'New Student Enrolled',
            'description' => "Student {$this->student->name} has been added successfully.",
            'student_id'  => $this->student->id,
            'read_at'     => null,
            'created_at'  => now()->toISOString(),
        ]);
    }

    /**
     * Custom broadcast event type (matched on the frontend).
     */
    public function broadcastType(): string
    {
        return 'StudentAdded';
    }
}
