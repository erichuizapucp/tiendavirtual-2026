package pe.edu.pucp.tiendavirtual.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sqs.SqsClient;
import software.amazon.awssdk.services.sqs.model.SendMessageRequest;

import java.util.Map;
import java.util.Optional;

@Service
public class VentasSyncPublisher {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final SqsClient sqsClient;
    private final String queueUrl;

    public VentasSyncPublisher(
            @Value("${app.sync.queue-url:${SYNC_QUEUE_URL:}}") String queueUrl
    ) {
        this.queueUrl = queueUrl;
        String awsRegion = Optional.ofNullable(System.getenv("AWS_REGION")).orElse("us-east-1");
        this.sqsClient = SqsClient.builder()
                .region(Region.of(awsRegion))
                .build();
    }

    public void publish(String entity, String operation, Map<String, Object> payload) {
        if (queueUrl == null || queueUrl.isBlank()) {
            throw new IllegalStateException("No se configuro app.sync.queue-url para publicar eventos");
        }

        try {
            String body = objectMapper.writeValueAsString(Map.of(
                    "entity", entity,
                    "operation", operation,
                    "payload", payload
            ));
            sqsClient.sendMessage(SendMessageRequest.builder()
                    .queueUrl(queueUrl)
                    .messageBody(body)
                    .build());
        } catch (JsonProcessingException ex) {
            throw new IllegalStateException("No se pudo serializar el evento para sincronizacion", ex);
        }
    }
}
