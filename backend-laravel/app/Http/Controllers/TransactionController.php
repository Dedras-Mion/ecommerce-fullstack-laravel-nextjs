<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Http\Resources\TransactionResource;

class TransactionController extends ApiController
{
    public function index()
    {
        $transactions = Transaction::paginate(10);

        return $this->successResponse([
            'transactions' => TransactionResource::collection($transactions),
            'links' => TransactionResource::collection($transactions)->response()->getData()->links,
            'meta' => TransactionResource::collection($transactions)->response()->getData()->meta,
        ]);
    }

    public function chart()
    {
        $month = 12;

        $successTransactions = Transaction::getData($month, 1);
        $successTransactionsChart = $this->chartData($successTransactions, $month);

        return $this->successResponse($successTransactionsChart);
    }

    public function chartData($transactions, $month)
    {
        $monthName = $transactions->map(function ($item) {
            return verta($item->created_at)->format('%B %Y');
        });

        $amount = $transactions->map(function ($item) {
            return $item->amount;
        });

        foreach ($monthName as $i => $v) {
            if (!isset($result[$v])) {
                $result[$v] = 0;
            }
            $result[$v] += $amount[$i];
        }

        if (count($result) != $month) {
            for ($i = 0; $i < $month; $i++) {
                $monthName = verta()->subMonth($i)->format('%B %Y');
                $shamsiMonths[$monthName] = 0;
            }
            $data = array_reverse(array_merge($shamsiMonths, $result));

            $finalResult = [];
            foreach ($data as $month => $val) {
                array_push($finalResult, ['month' => $month, 'value' => $val]);
            }
            return $finalResult;
        }

        $finalResult = [];
        foreach ($result as $month => $val) {
            array_push($result, ['month' => $month, 'value' => $val]);
        }
        return $finalResult;
    }
}
