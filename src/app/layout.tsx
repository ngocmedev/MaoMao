import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/ToastContext";
import { AuthProvider } from "@/components/auth/AuthContext";

export const metadata: Metadata = {
  title: "MaoMao - Học tiếng Trung, nhẹ nhàng mỗi ngày",
  description:
    "Không gian học tiếng Trung hiện đại, tinh tế cho người Việt. Nhập giáo trình có cấu trúc từ Gemini, ôn từ vựng thông minh và rèn luyện 4 kỹ năng Nghe - Nói - Đọc - Viết.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f83f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Một số extension trình duyệt (Bitdefender, v.v.) chèn thuộc tính như
// `bis_skin_checked`, `bis_register`, `__processed_*` vào DOM trước khi React
// hydrate, gây lỗi "hydration mismatch". Script này gỡ các thuộc tính đó sớm.
const stripExtensionAttrs = `(function(){
  var re=/^(bis_|__processed_)/;
  function clean(el){
    if(!el||!el.attributes)return;
    for(var i=el.attributes.length-1;i>=0;i--){
      var n=el.attributes[i].name;
      if(re.test(n))el.removeAttribute(n);
    }
  }
  function cleanAll(root){
    clean(root);
    if(root.querySelectorAll){
      var all=root.querySelectorAll('*');
      for(var i=0;i<all.length;i++)clean(all[i]);
    }
  }
  var obs=new MutationObserver(function(muts){
    for(var i=0;i<muts.length;i++){
      var m=muts[i];
      if(m.type==='attributes'&&re.test(m.attributeName||''))clean(m.target);
      else if(m.type==='childList')for(var j=0;j<m.addedNodes.length;j++)cleanAll(m.addedNodes[j]);
    }
  });
  obs.observe(document.documentElement,{attributes:true,childList:true,subtree:true});
  cleanAll(document.documentElement);
  window.addEventListener('load',function(){setTimeout(function(){obs.disconnect();},5000);});
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: stripExtensionAttrs }} />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#F7F9FD] text-[#202A3B] antialiased"
        suppressHydrationWarning
      >
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
