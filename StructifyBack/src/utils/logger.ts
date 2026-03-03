type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    data?: unknown;
}

function formatLog(entry: LogEntry): string {
    const base = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`;
    if (entry.data !== undefined) {
        return `${base} ${JSON.stringify(entry.data)}`;
    }
    return base;
}

function createLogEntry(level: LogLevel, message: string, data?: unknown): LogEntry {
    return {
        timestamp: new Date().toISOString(),
        level,
        message,
        data,
    };
}

export const logger = {
    info(message: string, data?: unknown): void {
        const entry = createLogEntry("info", message, data);
        console.log(formatLog(entry));
    },

    warn(message: string, data?: unknown): void {
        const entry = createLogEntry("warn", message, data);
        console.warn(formatLog(entry));
    },

    error(message: string, data?: unknown): void {
        const entry = createLogEntry("error", message, data);
        console.error(formatLog(entry));
    },

    debug(message: string, data?: unknown): void {
        const entry = createLogEntry("debug", message, data);
        console.debug(formatLog(entry));
    },
};
