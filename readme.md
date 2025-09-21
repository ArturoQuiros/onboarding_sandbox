# Onboarding Sandbox

A sandbox application designed to streamline and test onboarding processes.

## Features

- API port 5005
- Data base port 1433
- Data base credentials
    - sa
    - OnboardingWorld2025

## Test EndPoints

- http://localhost:5005/swagger/index.html
- http://localhost:5005/scalar/v1

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/onboarding_sandbox.git
    ```
2. **Install dependencies:**
    ```bash
    docker compose -f docker-compose-dev.yml build
    ```
3. **Run the app debug:**
    ```bash
    docker compose -f docker-compose-dev.yml up
    ```
4. **Stop the app:**
    ```bash
    Ctrl + C
    ```
5. **Delete images (optonal):**
    ```bash
    docker compose -f docker-compose-dev.yml down
    ```

## Release
1. **Release the container:**
    ```bash
    docker compose up
    ```

## Project Structure

- `/WebApp_Onboarding` — Web Aplicaton (Frontend)
- `/WS_Onboarding` — Web Service and Data Base (Backend)

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

This project is licensed under the MIT License.