<?php

use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventoController;

Route::get('/', function () {
    return view('evento.index');
})->middleware('auth');

//Para que solo este habilitado para usuarios logeados
Route::group(['middleware' => ['auth']], function () {
Route::get('agenda', [EventoController::class, 'index']);
Route::post('agenda/mostrar', [EventoController::class, 'show']);
Route::post('agenda/agregar', [EventoController::class, 'store']);
Route::post('agenda/editar/{id}', [EventoController::class, 'edit']);
Route::post('agenda/actualizar/{evento}', [EventoController::class, 'update']);
Route::post('agenda/borrar/{id}', [EventoController::class, 'destroy']);
});

Auth::routes();

Route::get('/dashboard', [App\Http\Controllers\HomeController::class, 'index'])->name('dashboard');
