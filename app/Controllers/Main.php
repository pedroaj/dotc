<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\View\View;

class Main extends BaseController
{
    private $session;

    public function __construct()
    {
        $this->session = session(); // Access session using session service

		helper('my_helper');
    }

    public function index()
    {
        $data = [];

		if (empty($this->request->getGet()))
        {
            $data['page'] = '';
        }
        else if (!empty($this->request->getGet()) && !empty($this->request->getGet('page')))
        {
            $data['page'] = $this->request->getGet('page');
        }        

        switch ($data['page']) {
            default:
                return view('fs_image', $data); // Use view helper for rendering
            case 'choose_character':
                return view('choose_character', $data);
            case 'mainboard':
                /*
                if (empty($this->session->get('character'))) // Game not started yet
                {
                    $this->get_set_initial_values(); // Implement logic here
                }
                */

                return view('mainboard', $data);
            case 'session':
                // Debug session data in development environment only
                if (ENVIRONMENT === 'development') {
                    echo view('debug', ['data' => $this->session->getGet()]);
                }
                break;
        }

        // No explicit return for default case
    }

    public function save_to_log()
    {
        $text = $this->request->getPost('text');
        $now = time();
        $dateFormatted = date('Y-m-d H:i:s', $now);
        $currentDate = date('Y-m-d', $now);
        $text = $dateFormatted . " - " . $text . PHP_EOL;
        $filename = "log_" . $currentDate . ".txt";

        file_put_contents($filename, $text, FILE_APPEND);
    }
}