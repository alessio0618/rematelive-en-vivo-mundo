import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Camera, Video, Paperclip, Smile, MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface DMWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  sender: 'user' | 'other';
  content: string;
  type: 'text' | 'image' | 'video';
  timestamp: string;
  fileUrl?: string;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export const DMWindow: React.FC<DMWindowProps> = ({ isOpen, onClose }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showChat, setShowChat] = useState(false); // For mobile navigation
  const { toast } = useToast();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset mobile state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowChat(false);
      setSelectedContact(null);
    }
  }, [isOpen]);

  const contacts: Contact[] = [
    {
      id: 1,
      name: 'dailydeal',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
      lastMessage: '¡Gracias por tu compra! Tu producto está en camino.',
      timestamp: 'Hace 30 min',
      unread: true
    },
    {
      id: 2,
      name: 'sneakerqueen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop',
      lastMessage: '¿Te interesa este nuevo modelo que acaba de llegar?',
      timestamp: 'Hace 2 horas',
      unread: true
    },
    {
      id: 3,
      name: 'lifeluxury',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
      lastMessage: 'El perfume ya está enviado, llegará mañana',
      timestamp: 'Ayer',
      unread: false
    }
  ];

  const sampleMessages: Message[] = [
    {
      id: 1,
      sender: 'other',
      content: '¡Hola! Gracias por tu compra del Set de Golf Premium',
      type: 'text',
      timestamp: '14:30'
    },
    {
      id: 2,
      sender: 'user',
      content: '¡Perfecto! ¿Cuándo llega?',
      type: 'text',
      timestamp: '14:32'
    },
    {
      id: 3,
      sender: 'other',
      content: 'Tu producto está en camino y llegará en 2-3 días hábiles',
      type: 'text',
      timestamp: '14:35'
    }
  ];

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setMessages(sampleMessages);
    
    // On mobile, navigate to chat view
    if (isMobile) {
      setShowChat(true);
    }
  };

  const handleBackToContacts = () => {
    setShowChat(false);
    setSelectedContact(null);
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedContact) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: message,
      type: 'text',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    toast({
      title: "Mensaje enviado",
      description: `Mensaje enviado a ${selectedContact.name}`,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = event.target.files?.[0];
    if (!file || !selectedContact) return;

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Add message with uploaded file
          const newMessage: Message = {
            id: messages.length + 1,
            sender: 'user',
            content: type === 'image' ? 'Foto enviada' : 'Video enviado',
            type: type,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            fileUrl: URL.createObjectURL(file)
          };

          setMessages(prev => [...prev, newMessage]);
          setUploadProgress(0);

          toast({
            title: type === 'image' ? "Foto enviada" : "Video enviado",
            description: `${type === 'image' ? 'Imagen' : 'Video'} compartido con ${selectedContact.name}`,
          });

          return 0;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleVideoUpload = () => {
    videoInputRef.current?.click();
  };

  if (!isOpen) return null;

  // Mobile layout
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        {/* Mobile Contacts List */}
        {!showChat && (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <h2 className="text-lg font-semibold text-foreground">Mensajes</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5 text-foreground" />
              </Button>
            </div>
            
            {/* Contacts */}
            <div className="flex-1 overflow-y-auto bg-background">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact)}
                  className="p-4 border-b border-border cursor-pointer hover:bg-accent/20 transition-colors bg-background"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {contact.unread && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm text-foreground">{contact.name}</h3>
                        <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Chat View */}
        {showChat && selectedContact && (
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="flex items-center space-x-3 p-4 border-b border-border bg-card">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBackToContacts}
                className="text-foreground hover:bg-accent/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img
                src={selectedContact.avatar}
                alt={selectedContact.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{selectedContact.name}</h3>
                <p className="text-sm text-muted-foreground">En línea</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-muted text-foreground border border-border'
                        : 'bg-card text-foreground border border-border'
                    }`}
                  >
                    {msg.type === 'text' && <p className="text-sm text-foreground">{msg.content}</p>}
                    {msg.type === 'image' && msg.fileUrl && (
                      <div>
                        <img
                          src={msg.fileUrl}
                          alt="Uploaded"
                          className="rounded-lg max-w-full h-auto mb-2"
                        />
                        <p className="text-sm text-foreground">{msg.content}</p>
                      </div>
                    )}
                    {msg.type === 'video' && msg.fileUrl && (
                      <div>
                        <video
                          src={msg.fileUrl}
                          controls
                          className="rounded-lg max-w-full h-auto mb-2"
                        />
                        <p className="text-sm text-foreground">{msg.content}</p>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}

              {/* Upload Progress */}
              {uploadProgress > 0 && (
                <div className="flex justify-end">
                  <div className="bg-card border border-border rounded-lg p-3 max-w-xs">
                    <div className="text-sm mb-2 text-foreground">Subiendo archivo...</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePhotoUpload}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent/20"
                >
                  <Camera className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleVideoUpload}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent/20"
                >
                  <Video className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent/20"
                >
                  <Paperclip className="w-5 h-5" />
                </Button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe un mensaje..."
                    className="w-full px-4 py-2 bg-muted text-foreground placeholder:text-muted-foreground rounded-full border border-border outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="rounded-full bg-accent hover:bg-accent/80 text-foreground"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, 'image')}
          className="hidden"
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={(e) => handleFileUpload(e, 'video')}
          className="hidden"
        />
      </div>
    );
  }

  // Desktop layout (unchanged)
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg w-full max-w-4xl h-[80vh] flex overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="w-1/3 border-r border-border flex flex-col bg-card">
          <div className="p-4 border-b border-border flex items-center justify-between bg-card">
            <h2 className="text-lg font-semibold text-foreground">Mensajes</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5 text-foreground" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto bg-card">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleContactSelect(contact)}
                className={`p-4 border-b border-border cursor-pointer hover:bg-accent/20 transition-colors bg-card ${
                  selectedContact?.id === contact.id ? 'bg-accent/20' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {contact.unread && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm text-foreground">{contact.name}</h3>
                      <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center space-x-3 bg-card">
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-foreground">{selectedContact.name}</h3>
                  <p className="text-sm text-muted-foreground">En línea</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-muted text-foreground border border-border'
                          : 'bg-card text-foreground border border-border'
                      }`}
                    >
                      {msg.type === 'text' && <p className="text-sm text-foreground">{msg.content}</p>}
                      {msg.type === 'image' && msg.fileUrl && (
                        <div>
                          <img
                            src={msg.fileUrl}
                            alt="Uploaded"
                            className="rounded-lg max-w-full h-auto mb-2"
                          />
                          <p className="text-sm text-foreground">{msg.content}</p>
                        </div>
                      )}
                      {msg.type === 'video' && msg.fileUrl && (
                        <div>
                          <video
                            src={msg.fileUrl}
                            controls
                            className="rounded-lg max-w-full h-auto mb-2"
                          />
                          <p className="text-sm text-foreground">{msg.content}</p>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}

                {/* Upload Progress */}
                {uploadProgress > 0 && (
                  <div className="flex justify-end">
                    <div className="bg-card border border-border rounded-lg p-3 max-w-xs">
                      <div className="text-sm mb-2 text-foreground">Subiendo archivo...</div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePhotoUpload}
                    className="text-muted-foreground hover:text-foreground hover:bg-accent/20"
                  >
                    <Camera className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleVideoUpload}
                    className="text-muted-foreground hover:text-foreground hover:bg-accent/20"
                  >
                    <Video className="w-5 h-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent/20"
                  >
                    <Paperclip className="w-5 h-5" />
                  </Button>

                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Escribe un mensaje..."
                      className="w-full px-4 py-2 bg-muted text-foreground placeholder:text-muted-foreground rounded-full border border-border outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="rounded-full bg-accent hover:bg-accent/80 text-foreground"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-background">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2 text-foreground">Selecciona una conversación</h3>
                <p className="text-muted-foreground">Elige un contacto para empezar a chatear</p>
              </div>
            </div>
          )}
        </div>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, 'image')}
          className="hidden"
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={(e) => handleFileUpload(e, 'video')}
          className="hidden"
        />
      </div>
    </div>
  );
};
