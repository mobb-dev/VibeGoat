# File Upload/Download REST API

A simple Java REST API built with Spring Boot that allows users to upload files and download them later.

## Features

- **File Upload**: Upload files with automatic unique filename generation
- **File Download**: Download files by filename
- **File Listing**: List all uploaded files
- **File Deletion**: Delete files by filename
- **File Information**: Get file metadata (size, last modified)
- **Web Interface**: Simple HTML interface for testing the API

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Quick Start

### 1. Build the Application

```bash
mvn clean install
```

### 2. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### 3. Access the Web Interface

Open your browser and navigate to `http://localhost:8080` to access the web interface for testing the API.

## API Endpoints

### Upload File
- **URL**: `POST /api/files/upload`
- **Content-Type**: `multipart/form-data`
- **Parameter**: `file` (the file to upload)
- **Response**: JSON with success message and generated filename

**Example using curl:**
```bash
curl -X POST -F "file=@/path/to/your/file.txt" http://localhost:8080/api/files/upload
```

### Download File
- **URL**: `GET /api/files/download?filename={filename}`
- **Response**: File download with appropriate headers

**Example using curl:**
```bash
curl -O -J "http://localhost:8080/api/files/download?filename={filename}"
```

### List Files
- **URL**: `GET /api/files/list`
- **Response**: JSON with list of all uploaded files

**Example using curl:**
```bash
curl http://localhost:8080/api/files/list
```

### Delete File
- **URL**: `DELETE /api/files/delete?filename={filename}`
- **Response**: JSON with success message

**Example using curl:**
```bash
curl -X DELETE "http://localhost:8080/api/files/delete?filename={filename}"
```

### Get File Information
- **URL**: `GET /api/files/info?filename={filename}`
- **Response**: JSON with file metadata (size, last modified)

**Example using curl:**
```bash
curl "http://localhost:8080/api/files/info?filename={filename}"
```

## Configuration

The application can be configured through `src/main/resources/application.properties`:

- `server.port`: Server port (default: 8080)
- `spring.servlet.multipart.max-file-size`: Maximum file size (default: 10MB)
- `spring.servlet.multipart.max-request-size`: Maximum request size (default: 10MB)

## File Storage

Files are stored in the `uploads/` directory in the application's working directory. Each file is given a unique UUID-based filename to prevent conflicts.

## Security Considerations

This is a simple demo application. For production use, consider implementing:

- Authentication and authorization
- File type validation
- Virus scanning
- Rate limiting
- Secure file storage (e.g., cloud storage)
- Input validation and sanitization

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK`: Successful operation
- `400 Bad Request`: Invalid input or file not found
- `404 Not Found`: File not found
- `500 Internal Server Error`: Server error

## Development

### Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/example/fileapi/
│   │       ├── FileApiApplication.java
│   │       ├── controller/
│   │       │   └── FileController.java
│   │       └── service/
│   │           └── FileService.java
│   └── resources/
│       ├── application.properties
│       └── static/
│           └── index.html
└── test/
    └── java/
        └── com/example/fileapi/
            └── FileApiApplicationTests.java
```

### Running Tests

```bash
mvn test
```

### Building JAR

```bash
mvn clean package
```

The executable JAR will be created in the `target/` directory.

## License

This project is open source and available under the MIT License. 
