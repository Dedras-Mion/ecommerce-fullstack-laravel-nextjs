<?php

namespace App\Exceptions;

use Error;
use Throwable;
use ErrorException;
use BadMethodCallException;
use App\Traits\ApiResponser;
use Illuminate\Support\Facades\DB;
use Ghasedak\Exceptions\ApiException;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\RelationNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    use ApiResponser;

    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {
        if ($e instanceof ModelNotFoundException) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 404);
        }

        if ($e instanceof NotFoundHttpException) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 404);
        }

        if ($e instanceof MethodNotAllowedHttpException) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 500);
        }

        if ($e instanceof Exception) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 500);
        }

        if ($e instanceof BadMethodCallException) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 500);
        }

        if ($e instanceof Error) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 500);
        }

        if ($e instanceof QueryException) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 500);
        }

        if ($e instanceof RelationNotFoundException) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 500);
        }

        if ($e instanceof ApiException) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 500);
        }

        if (config('app.debug')) {
            DB::rollBack();
            return parent::render($request, $e);
        }

        DB::rollBack();
        return $this->errorResponse($e->getMessage(), 500);
    }
}
