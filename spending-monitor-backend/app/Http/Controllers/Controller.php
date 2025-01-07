<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\JsonResponse;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Send a success response.
     *
     * @param mixed $data
     * @param string $message
     * @param int $code
     * @return JsonResponse
     */
    protected function sendSuccess($data = [], string $message = 'Success', int $code = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    /**
     * Send an error response.
     *
     * @param string $message
     * @param mixed $errors
     * @param int $code
     * @return JsonResponse
     */
    protected function sendError(string $message = 'Error', $errors = [], int $code = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $code);
    }

    /**
     * Send a validation error response.
     *
     * @param mixed $errors
     * @param string $message
     * @return JsonResponse
     */
    protected function sendValidationError($errors, string $message = 'Validation Error'): JsonResponse
    {
        return $this->sendError($message, $errors, 422);
    }

    /**
     * Send an unauthorized error response.
     *
     * @param string $message
     * @return JsonResponse
     */
    protected function sendUnauthorized(string $message = 'Unauthorized'): JsonResponse
    {
        return $this->sendError($message, [], 401);
    }

    /**
     * Send a not found error response.
     *
     * @param string $message
     * @return JsonResponse
     */
    protected function sendNotFound(string $message = 'Not Found'): JsonResponse
    {
        return $this->sendError($message, [], 404);
    }

    /**
     * Send a created response.
     *
     * @param mixed $data
     * @param string $message
     * @return JsonResponse
     */
    protected function sendCreated($data = [], string $message = 'Created Successfully'): JsonResponse
    {
        return $this->sendSuccess($data, $message, 201);
    }
}
