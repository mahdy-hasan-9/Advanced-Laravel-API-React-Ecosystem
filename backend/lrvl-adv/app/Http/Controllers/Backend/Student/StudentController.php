<?php

namespace App\Http\Controllers\Backend\Student;

use App\Http\Controllers\Controller;
use App\Http\Request\Backend\Student\StudentRequest;
use App\Services\Backend\Student\StudentService;


class StudentController extends Controller
{
    protected StudentService $studentService;

    public function __construct(StudentService $studentService)
    {
        $this->studentService = $studentService;
    }

    public function index()
    {
        // To be implemented: List students
    }

    public function store(StudentRequest $request)
    {

        // return response()->json($request->validated());

        $result = $this->studentService->store($request->validated());

        return response()->json($result, $result['status']);
    }

    public function update(StudentRequest $request, int $id)
    {
        $result = $this->studentService->update($id, $request->validated());

        return response()->json($result, $result['status']);
    }

    public function destroy(int $id)
    {
        $result = $this->studentService->delete($id);

        return response()->json($result, $result['status']);
    }
}
