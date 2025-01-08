<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'currency',
        'date',
        'category_id',
        'payment_method',
        'location',
        'description',
        'is_recurring',
        'recurring_frequency',
        'recurring_end_date',
        'receipt_image'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'date' => 'date',
        'is_recurring' => 'boolean',
        'recurring_end_date' => 'date'
    ];

    // Define the possible values for recurring_frequency
    public const RECURRING_FREQUENCIES = [
        'weekly',
        'monthly',
        'yearly'
    ];

    // Define the possible values for payment_method
    public const PAYMENT_METHODS = [
        'cash',
        'credit_card',
        'debit_card',
        'bank_transfer',
        'mobile_payment'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Helper method to get formatted amount with currency
    public function getFormattedAmountAttribute()
    {
        return "{$this->currency} {$this->amount}";
    }

    // Helper method to check if expense is recurring
    public function isRecurring()
    {
        return $this->is_recurring;
    }

    // Helper method to get next occurrence date
    public function getNextOccurrenceDate()
    {
        if (!$this->is_recurring) {
            return null;
        }

        $lastDate = $this->date;
        
        switch ($this->recurring_frequency) {
            case 'weekly':
                return $lastDate->addWeek();
            case 'monthly':
                return $lastDate->addMonth();
            case 'yearly':
                return $lastDate->addYear();
            default:
                return null;
        }
    }
}
