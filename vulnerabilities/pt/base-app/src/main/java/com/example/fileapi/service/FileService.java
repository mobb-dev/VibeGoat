package com.example.fileapi.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class FileService {

    private static final String UPLOAD_DIR = "uploads";

    public FileService() {
        // Create upload directory if it doesn't exist
        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to create upload directory", e);
        }
    }

    public String uploadFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
        Path filePath = Paths.get(UPLOAD_DIR, uniqueFilename);

        // Save file
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return uniqueFilename;
    }

    public Path getFile(String filename) {
        Path filePath = Paths.get(UPLOAD_DIR, filename);
        
        if (!Files.exists(filePath)) {
            throw new IllegalArgumentException("File not found: " + filename);
        }

        return filePath;
    }

    public List<String> listFiles() throws IOException {
        try (Stream<Path> paths = Files.walk(Paths.get(UPLOAD_DIR), 1)) {
            return paths
                    .filter(Files::isRegularFile)
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .collect(Collectors.toList());
        }
    }

    public void deleteFile(String filename) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIR, filename);
        
        if (!Files.exists(filePath)) {
            throw new IllegalArgumentException("File not found: " + filename);
        }

        Files.delete(filePath);
    }
} 
