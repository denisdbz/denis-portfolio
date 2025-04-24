# ...
# (outras instalações acima)

# Instala Nikto
RUN git clone https://github.com/sullo/nikto.git /opt/nikto && \
    ln -s /opt/nikto/program/nikto.pl /usr/local/bin/nikto && \
    chmod +x /usr/local/bin/nikto

# Instala k6 manualmente
RUN curl -L https://github.com/grafana/k6/releases/download/v0.47.0/k6-v0.47.0-linux-amd64.tar.gz | tar -xz && \
    mv k6-v0.47.0-linux-amd64/k6 /usr/local/bin/ && \
    chmod +x /usr/local/bin/k6 && \
    rm -rf k6-v0.47.0-linux-amd64
