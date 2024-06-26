## Welcome to AfroConnect

Welcome to AfroConnect, your gateway to discovering and celebrating African cultures around the world. Whether you're passionate about exploring diverse traditions, languages, or histories, AfroConnect provides a platform to connect with your roots and learn more about the rich tapestry of Africa.

You can explore AfroConnect online at https://afroconnect.albanagisa.fr/



## Requirements

- Docker Compose version v2.27.1 or greater

## Getting Started

To start the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/ronyk10/AfroConnect.git
    ```

2. Navigate into the project directory:

    ```bash
    cd AfroConnect
    ```

3. Start the project using Docker Compose:

    ```bash
    docker compose up --build -d
    ```

    This command will build the necessary Docker images (if not already built) and start the containers in detached mode (`-d`).

4. Access the application:

    Once the containers are running, open [http://localhost:3000](http://localhost:3000) in your web browser to interact with the application.

5. Admin credentials:

    To access the admin features, use the following credentials:
    - **Username:** admin
    - **Email:** admin@admin.com
    - **Password:** admin

## API Usage

### Adding Themes

To add a theme, use the following API route:
- **Route:** `/api-doc`
- This route allows you to add themes via a POST request.

### Loading Countries

To load countries, use the following API route:
- **Route:** `/api-doc`
- Send a POST request to this route to load countries into the application.

