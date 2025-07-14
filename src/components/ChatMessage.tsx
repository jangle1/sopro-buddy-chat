
import { cn } from "@/lib/utils";
import { Bot, User as UserIcon } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const YOUTUBE_REGEX = /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w-]{11})|https?:\/\/(?:www\.)?youtu\.be\/([\w-]{11})/;
const PDF_REGEX = /(https?:\/\/[^\s]+\.pdf)/i;
const TABLE_REGEX = /((\|.+\|\n?)+)/m;

function renderTable(tableText: string) {
  // Ensure the table ends with a newline for consistent splitting
  const normalized = tableText.endsWith("\n") ? tableText : tableText + "\n";
  const rows = normalized.trim().split("\n").map(row => row.trim());
  if (rows.length < 2) return null;
  // Remove separator row (---)
  const header = rows[0].split("|").map(cell => cell.trim()).filter(Boolean);
  const bodyRows = rows.slice(2).map(row => row.split("|").map(cell => cell.trim()).filter(Boolean));
  return (
    <div className="overflow-x-auto my-2">
      <table className="min-w-full border text-xs md:text-sm bg-background rounded shadow">
        <thead>
          <tr>
            {header.map((cell, i) => (
              <th key={i} className="px-2 py-1 border-b font-semibold text-left bg-muted">{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-2 py-1 border-b align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  // Find YouTube link
  const ytMatch = message.match(YOUTUBE_REGEX);
  let youtubeId = null;
  let youtubeUrl = null;
  if (ytMatch) {
    youtubeId = ytMatch[1] || ytMatch[2];
    youtubeUrl = ytMatch[0];
  }
  // Find PDF link
  const pdfMatch = message.match(PDF_REGEX);
  const pdfUrl = pdfMatch ? pdfMatch[1] : null;

  // Find markdown table
  const tableMatch = message.match(TABLE_REGEX);
  let tableHtml = null;
  let displayMessage = message;
  if (tableMatch) {
    tableHtml = renderTable(tableMatch[1]);
    displayMessage = message.replace(tableMatch[1], "");
  }

  // Replace YouTube and PDF links in text with LINKs
  if (youtubeUrl) {
    displayMessage = displayMessage.replace(youtubeUrl, `<a href='${youtubeUrl}' target='_blank' rel='noopener noreferrer' class='underline text-primary font-semibold'>LINK</a>`);
  }
  if (pdfUrl) {
    displayMessage = displayMessage.replace(pdfUrl, `<a href='${pdfUrl}' target='_blank' rel='noopener noreferrer' class='underline text-primary font-semibold'>LINK do dokumentacji</a>`);
  }

  return (
    <div className={cn(
      "flex w-full mb-4 items-end",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 mr-2">
          <div className="bg-primary/90 text-white rounded-full w-8 h-8 flex items-center justify-center shadow">
            <Bot className="w-5 h-5" />
          </div>
        </div>
      )}
      <div className={cn(
        "relative max-w-[80%] px-4 py-3 shadow-sm",
        isUser
          ? "bg-primary text-primary-foreground ml-4 rounded-2xl rounded-br-sm"
          : "bg-muted text-muted-foreground mr-4 rounded-2xl rounded-bl-sm"
      )}>
        {/* Bubble tail */}
        <span
          className={cn(
            "absolute bottom-0 w-3 h-3",
            isUser
              ? "right-[-12px] bg-primary clip-bubble-tail-user"
              : "left-[-12px] bg-muted clip-bubble-tail-assistant"
          )}
        />
        <div className="text-sm leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: displayMessage }} />
        {tableHtml}
        {youtubeId && (
          <div className="mt-3 rounded-lg overflow-hidden flex flex-col items-center gap-2">
            <iframe
              width="320"
              height="180"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary/80 transition"
              >
                LINK do dokumentacji
              </a>
            )}
          </div>
        )}
        {!youtubeId && pdfUrl && (
          <div className="mt-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary/80 transition"
            >
              LINK do dokumentacji
            </a>
          </div>
        )}
        <span className={cn(
          "text-xs mt-1 block opacity-70 text-right",
          isUser ? "text-primary-foreground/70" : "text-muted-foreground/70"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {isUser && (
        <div className="flex-shrink-0 ml-2">
          <div className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow">
            <UserIcon className="w-5 h-5" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;

// Add to your global CSS (e.g. index.css):
// .clip-bubble-tail-user { clip-path: polygon(100% 0, 0 100%, 100% 100%); }
// .clip-bubble-tail-assistant { clip-path: polygon(0 0, 100% 100%, 0 100%); }
