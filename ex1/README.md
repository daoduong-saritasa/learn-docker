# Docker

## Development

### Start server

```bash
yarn start
```

## Build

### Build docker image

```bash
docker build -t <name> . 
```

### Run docker image

```bash
docker run -dp 3000:3000 <name>
```