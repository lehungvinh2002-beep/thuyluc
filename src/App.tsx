/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  Layers, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Zap,
  ChevronDown,
  X,
  Search,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SUGGESTIONS = [
  { vn: "Dưa hấu", en: "Watermelon", cat: "Trái cây" },
  { vn: "Sầu riêng", en: "Durian", cat: "Trái cây" },
  { vn: "Quả dừa", en: "Coconut", cat: "Trái cây" },
  { vn: "iPhone", en: "iPhone", cat: "Đồ vật" },
  { vn: "Đồng hồ Rolex", en: "Rolex Watch", cat: "Đồ vật" },
  { vn: "Kim cương", en: "Diamond", cat: "Đồ vật" },
  { vn: "Khối vàng", en: "Gold Bar", cat: "Đồ vật" },
  { vn: "Bóng bowling", en: "Bowling Ball", cat: "Đồ vật" },
  { vn: "Mũ bảo hiểm", en: "Helmet", cat: "Đồ vật" },
  { vn: "Máy ảnh DSLR", en: "DSLR Camera", cat: "Đồ vật" },
  { vn: "Laptop Gaming", en: "Gaming Laptop", cat: "Đồ vật" },
  { vn: "Giày sneaker", en: "Sneaker", cat: "Đồ vật" },
  { vn: "Lon nước ngọt", en: "Soda Can", cat: "Đồ vật" },
  { vn: "Chai thủy tinh", en: "Glass Bottle", cat: "Đồ vật" },
  { vn: "Khối băng", en: "Ice Block", cat: "Đồ vật" },
  { vn: "Bánh kem", en: "Cake", cat: "Đồ vật" },
  { vn: "Hamburger", en: "Hamburger", cat: "Đồ vật" },
  { vn: "Pizza", en: "Pizza", cat: "Đồ vật" },
  { vn: "Quả dứa", en: "Pineapple", cat: "Trái cây" },
  { vn: "Quả mít", en: "Jackfruit", cat: "Trái cây" },
  { vn: "Trứng gà", en: "Chicken Egg", cat: "Đồ vật" },
  { vn: "Bóng tennis", en: "Tennis Ball", cat: "Đồ vật" },
  { vn: "Bóng golf", en: "Golf Ball", cat: "Đồ vật" },
  { vn: "Đàn Guitar", en: "Guitar", cat: "Đồ vật" },
  { vn: "Đàn Piano", en: "Piano", cat: "Đồ vật" },
  { vn: "Xe đồ chơi", en: "Toy Car", cat: "Đồ vật" },
  { vn: "Búp bê", en: "Doll", cat: "Đồ vật" },
  { vn: "Khối Rubik", en: "Rubik's Cube", cat: "Đồ vật" },
  { vn: "Sách dày", en: "Thick Book", cat: "Đồ vật" },
  { vn: "Chậu cây", en: "Flower Pot", cat: "Đồ vật" },
  { vn: "Bình hoa", en: "Vase", cat: "Đồ vật" },
  { vn: "Gương cầm tay", en: "Hand Mirror", cat: "Đồ vật" },
  { vn: "Kính mắt", en: "Glasses", cat: "Đồ vật" },
  { vn: "Tai nghe", en: "Headphones", cat: "Đồ vật" },
  { vn: "Loa Bluetooth", en: "Bluetooth Speaker", cat: "Đồ vật" },
  { vn: "Bàn là", en: "Iron", cat: "Đồ vật" },
  { vn: "Máy sấy tóc", en: "Hair Dryer", cat: "Đồ vật" },
  { vn: "Ấm đun nước", en: "Kettle", cat: "Đồ vật" },
  { vn: "Nồi cơm điện", en: "Rice Cooker", cat: "Đồ vật" },
  { vn: "Lò vi sóng", en: "Microwave", cat: "Đồ vật" },
  { vn: "Tủ lạnh mini", en: "Mini Fridge", cat: "Đồ vật" },
  { vn: "Máy giặt", en: "Washing Machine", cat: "Đồ vật" },
  { vn: "Tivi", en: "TV", cat: "Đồ vật" },
  { vn: "Ghế gỗ", en: "Wooden Chair", cat: "Đồ vật" },
  { vn: "Bàn trà", en: "Tea Table", cat: "Đồ vật" },
  { vn: "Đèn ngủ", en: "Night Light", cat: "Đồ vật" },
  { vn: "Vali du lịch", en: "Suitcase", cat: "Đồ vật" },
  { vn: "Ba lô", en: "Backpack", cat: "Đồ vật" },
  { vn: "Ô/Dù", en: "Umbrella", cat: "Đồ vật" },
  { vn: "Áo khoác da", en: "Leather Jacket", cat: "Đồ vật" },
  { vn: "Pin dự phòng", en: "Power Bank", cat: "Đồ vật" },
  { vn: "Chuột máy tính", en: "Computer Mouse", cat: "Đồ vật" },
  { vn: "Bàn phím cơ", en: "Mechanical Keyboard", cat: "Đồ vật" },
  { vn: "Máy tính bảng", en: "Tablet", cat: "Đồ vật" },
  { vn: "Đồng hồ thông minh", en: "Smartwatch", cat: "Đồ vật" },
  { vn: "Thẻ tín dụng", en: "Credit Card", cat: "Đồ vật" },
  { vn: "Chìa khóa xe", en: "Car Key", cat: "Đồ vật" },
  { vn: "Bật lửa Zippo", en: "Zippo Lighter", cat: "Đồ vật" },
  { vn: "Dao đa năng", en: "Multi-tool Knife", cat: "Đồ vật" },
  { vn: "Đèn pin", en: "Flashlight", cat: "Đồ vật" },
  { vn: "Pin AA", en: "AA Battery", cat: "Đồ vật" },
  { vn: "Bóng đèn", en: "Light Bulb", cat: "Đồ vật" },
  { vn: "Cốc sứ", en: "Ceramic Mug", cat: "Đồ vật" },
  { vn: "Đĩa gốm", en: "Ceramic Plate", cat: "Đồ vật" },
  { vn: "Muỗng inox", en: "Stainless Spoon", cat: "Đồ vật" },
  { vn: "Nĩa inox", en: "Stainless Fork", cat: "Đồ vật" },
  { vn: "Dao bếp", en: "Kitchen Knife", cat: "Đồ vật" },
  { vn: "Thớt gỗ", en: "Wooden Cutting Board", cat: "Đồ vật" },
  { vn: "Chảo chống dính", en: "Non-stick Pan", cat: "Đồ vật" },
  { vn: "Nồi áp suất", en: "Pressure Cooker", cat: "Đồ vật" },
  { vn: "Máy xay sinh tố", en: "Blender", cat: "Đồ vật" },
  { vn: "Máy pha cà phê", en: "Coffee Maker", cat: "Đồ vật" },
  { vn: "Bàn chải", en: "Toothbrush", cat: "Đồ vật" },
  { vn: "Kem đánh răng", en: "Toothpaste", cat: "Đồ vật" },
  { vn: "Dầu gội", en: "Shampoo", cat: "Đồ vật" },
  { vn: "Cục xà phòng", en: "Soap Bar", cat: "Đồ vật" },
  { vn: "Máy cạo râu", en: "Electric Shaver", cat: "Đồ vật" },
  { vn: "Lược chải đầu", en: "Hair Comb", cat: "Đồ vật" },
  { vn: "Son môi", en: "Lipstick", cat: "Đồ vật" },
  { vn: "Hộp phấn", en: "Makeup Compact", cat: "Đồ vật" },
  { vn: "Nước hoa", en: "Perfume", cat: "Đồ vật" },
  { vn: "Ví da", en: "Leather Wallet", cat: "Đồ vật" },
  { vn: "Thắt lưng", en: "Leather Belt", cat: "Đồ vật" },
  { vn: "Cà vạt", en: "Necktie", cat: "Đồ vật" },
  { vn: "Khuy măng sét", en: "Cufflinks", cat: "Đồ vật" },
  { vn: "Nhẫn vàng", en: "Gold Ring", cat: "Đồ vật" },
  { vn: "Dây chuyền", en: "Silver Necklace", cat: "Đồ vật" },
  { vn: "Bông tai", en: "Earrings", cat: "Đồ vật" },
  { vn: "Vòng tay", en: "Bracelet", cat: "Đồ vật" },
  { vn: "Kính hiển vi", en: "Microscope", cat: "Đồ vật" },
  { vn: "Kính thiên văn", en: "Telescope", cat: "Đồ vật" },
  { vn: "Ống nhòm", en: "Binoculars", cat: "Đồ vật" },
  { vn: "La bàn", en: "Compass", cat: "Đồ vật" },
  { vn: "Thước dây", en: "Tape Measure", cat: "Đồ vật" },
  { vn: "Búa sắt", en: "Iron Hammer", cat: "Đồ vật" },
  { vn: "Tua vít", en: "Screwdriver", cat: "Đồ vật" },
  { vn: "Kìm cắt", en: "Cutting Pliers", cat: "Đồ vật" },
  { vn: "Cờ lê", en: "Wrench", cat: "Đồ vật" },
  { vn: "Mỏ lết", en: "Adjustable Wrench", cat: "Đồ vật" },
  { vn: "Máy khoan", en: "Hand Drill", cat: "Đồ vật" }
];

const IMAGE_PROMPT_TEMPLATE = "Ultra-realistic macro cinematic shot, vertical frame 9:16. A massive industrial hydraulic press machine. The [OBJECT] is LIFE-SIZED and fills the entire pressing area, appearing huge and substantial. Camera straight front-facing, extreme close-up on the [OBJECT] sitting on the heavy steel base. The cylindrical press head is massive, hovering just millimeters above the [OBJECT]. Engraved metal name plate on the press head reads '[BRAND]'. Yellow and black hazard stripes on the machine frame. Strong industrial lighting, realistic textures, hyper-detailed surface realism. No miniature effect, real-world scale.";

const getVideoPrompt = (objectEn: string, vnName: string) => {
  const name = vnName.toLowerCase();
  const en = objectEn.toLowerCase();
  
  let materialReaction = "the organic structure ruptures, skin bursting with juice and pulp spraying out as the fibers are pulverized";
  let materialCollapse = "internal material bursting outward, fragments of pulp scattering and spreading as surfaces tear and collapse";

  if (en.includes('camera') || en.includes('lens') || name.includes('máy ảnh') || name.includes('ống kính')) {
    materialReaction = "the lens glass shatters into beautiful spiderweb fragments, the metal lens tube bending and metal rings warping instantly";
    materialCollapse = "internal complex optics bursting outward, optical glass fragments scattering, and electronic body parts folding and tearing";
  } else if (en.includes('iphone') || en.includes('tablet') || en.includes('macbook') || en.includes('laptop') || en.includes('phone') || en.includes('computer') || en.includes('speaker') || en.includes('battery') || en.includes('clock') || en.includes('watch') || en.includes('remote') || en.includes('calculator') || en.includes('blender') || en.includes('shaver')) {
    materialReaction = "the tempered glass screen shatters into millions of pieces, plastic or metal frames splitting and wires bulging out";
    materialCollapse = "internal circuit boards snapping and fragments of electronic components escaping, metal layers folding and plastic surfaces tearing";
  } else if (en.includes('sneaker') || en.includes('shoe') || name.includes('giày') || name.includes('dép')) {
    materialReaction = "the thick rubber sole compresses intensely, fabric wrinkling and seams tearing open as foam padding bulges violently";
    materialCollapse = "internal material and foam bursting outward, torn fabric layers spreading, and the rubber sole folding and flattening completely";
  } else if (en.includes('helmet') || name.includes('mũ bảo hiểm')) {
    materialReaction = "the hard outer shell develops massive fractures, splintering into jagged pieces as the internal foam is crushed flat";
    materialCollapse = "broken shell fragments scattering, internal compressed foam being squeezed outward, and the helmet structure completely collapsing";
  } else if (en.includes('gold') || en.includes('silver') || en.includes('ring') || en.includes('necklace') || en.includes('bracelet') || name.includes('vàng') || name.includes('bạc') || name.includes('nhẫn') || name.includes('dây chuyền')) {
    materialReaction = "the metal instantly bulges and flows outward like thick fluid, edges stretching and flattening into a wide disc without cracking";
    materialCollapse = "soft metal spreading across the base, surface layers folding and stretching as the metallic material is flattened completely";
  } else if (en.includes('bowling') || en.includes('sphere') || en.includes('bulb') || en.includes('mug') || en.includes('plate') || en.includes('glass') || name.includes('bóng') || name.includes('quả cầu') || name.includes('kim cương') || name.includes('thủy tinh')) {
    materialReaction = "the surface develops massive spiderweb ruptures, shattering into large sharp fragments as the solid core collapses";
    materialCollapse = "shattered fragments scattering, the core material spreading as fine dust and debris, and surfaces folding under extreme pressure";
  }

  return `8 seconds total duration, starting from previous frame. Vertical 9:16 frame. Camera remains COMPLETELY LOCKED, no movement, no zoom, no cuts. A massive industrial hydraulic press head descends continuously and relentlessly onto a life-sized ${objectEn} placed on a scratched steel base. 0-1s: the press head immediately pushes the ${objectEn} down hard, compressing it rapidly so that the press head is already very close to the steel base by the end of the first second, with the object severely squashed and trapped in a very thin space. No gentle hovering, no light first contact, no large remaining gap. 1-3s: the ${objectEn} begins visibly breaking apart based on its material properties, with ${materialReaction}. 3-6s: heavy compression phase, the press head NEVER STOPS or pauses, continuing to force the ${objectEn} flatter and flatter with extreme realistic destruction, ${materialCollapse} as parts are pulverized further. 6-8s: final compression sub-phase, the press head continues its steady downward descent throughout the entire final duration until it is almost touching the steel base, leaving only a very thin crushed layer of fine debris in between. The hydraulic press must continue descending throughout the entire 8 seconds. Never stop, pause, or hold position just because the ${objectEn} has already cracked, shattered, or broken apart. Even after the ${objectEn} is destroyed, the press head must keep pushing the fragments and internal material downward to achieve a paper-thin result. No upward movement, no bouncing, no reset, no fake rubber deformation, no cartoon squash, no text, no watermark, no logo, no subtitles, no UI overlay. The final frame must show maximum compression with a near-zero gap between the press head and the base. Ultra realistic material physics, photorealistic industrial lighting, viral oddly satisfying hydraulic press crush.`;
};

export default function App() {
  const [objectInput, setObjectInput] = useState("");
  const [brandInput, setBrandInput] = useState("VanTheWeb");
  const [generatedResults, setGeneratedResults] = useState<{name: string, image: string, video: string}[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<{idx: number, type: 'image' | 'video'} | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedInModal, setSelectedInModal] = useState<string[]>([]);
  const [copyAllImagesStatus, setCopyAllImagesStatus] = useState(false);
  const [copyAllVideosStatus, setCopyAllVideosStatus] = useState(false);

  const handleOpenModal = () => {
    const currentItems = objectInput.split(',').map(s => s.trim()).filter(Boolean);
    // Đồng bộ với danh sách gợi ý (không phân biệt hoa thường)
    const matchedItems = currentItems.map(item => {
      const match = SUGGESTIONS.find(s => s.vn.toLowerCase() === item.toLowerCase());
      return match ? match.vn : item;
    });
    setSelectedInModal(matchedItems);
    setShowModal(true);
  };

  const handleGenerate = () => {
    if (!objectInput.trim()) return;

    const objects = objectInput.split(',').map(s => s.trim()).filter(Boolean);
    
    const results = objects.map(obj => {
      const suggestion = SUGGESTIONS.find(s => s.vn.toLowerCase() === obj.toLowerCase());
      const objectInEnglish = suggestion ? suggestion.en : obj;

      return {
        name: obj,
        image: IMAGE_PROMPT_TEMPLATE
          .replace("[OBJECT]", objectInEnglish)
          .replace("[BRAND]", brandInput || "VanTheWeb"),
        video: getVideoPrompt(objectInEnglish, obj)
      };
    });

    setGeneratedResults(results);
    setIsGenerated(true);
  };

  const toggleModalItem = (vn: string) => {
    setSelectedInModal(prev => {
      const isSelected = prev.some(i => i.toLowerCase() === vn.toLowerCase());
      if (isSelected) {
        return prev.filter(i => i.toLowerCase() !== vn.toLowerCase());
      } else {
        return [...prev, vn];
      }
    });
  };

  const confirmModalSelection = () => {
    setObjectInput(selectedInModal.join(', '));
    setShowModal(false);
  };

  const handleCopy = (text: string, idx: number, type: 'image' | 'video') => {
    navigator.clipboard.writeText(text);
    setCopiedIndex({ idx, type });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadImages = () => {
    const content = generatedResults.map(r => r.image).join('\n\n');
    downloadFile(content, 'prompt-anh.txt');
  };

  const downloadVideos = () => {
    const content = generatedResults.map(r => r.video).join('\n\n');
    downloadFile(content, 'prompt-video.txt');
  };

  const copyAllImagePrompts = () => {
    const content = generatedResults.map(r => r.image).join('\n\n');
    navigator.clipboard.writeText(content);
    setCopyAllImagesStatus(true);
    setTimeout(() => setCopyAllImagesStatus(false), 2000);
  };

  const copyAllVideoPrompts = () => {
    const content = generatedResults.map(r => r.video).join('\n\n');
    navigator.clipboard.writeText(content);
    setCopyAllVideosStatus(true);
    setTimeout(() => setCopyAllVideosStatus(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-pink-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block mb-6"
          >
            <div className="p-1 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <img 
                src="https://yt3.googleusercontent.com/Gug5UDLjPMRBto68HqZvJCSryebEkqiI2_9qV_8y16ZKIVLgxYBFx_PyUYZStcTzSc3v7TLq=s900-c-k-c0x00ffffff-no-rj" 
                alt="Logo"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#0a0a0c]"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent"
          >
            Trình Tạo Prompt <br className="md:hidden" />
            <span className="text-cyan-500">Máy Ép Thủy Lực AI</span>
          </motion.h1>
        </header>

        {/* Input Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 bg-slate-900/40 p-10 rounded-[3rem] border border-slate-800/60 backdrop-blur-xl shadow-2xl relative overflow-hidden group max-w-3xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10 space-y-8">
            {/* Row 1: Object Input + Suggestion Button */}
            <div className="space-y-3">
              <div className="flex justify-between items-end ml-1">
                <label className="block text-sm font-bold text-cyan-500 uppercase tracking-wider">
                  Vật thể muốn ép
                </label>
                <span className="text-[10px] font-medium text-amber-400 italic uppercase tracking-tighter">
                  * Các vật phẩm cách nhau bằng dấu phẩy (,)
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <div className="flex-grow">
                  <input
                    type="text"
                    value={objectInput}
                    onChange={(e) => setObjectInput(e.target.value)}
                    placeholder="Nhập vật thể (VD: Dưa hấu, iPhone...)"
                    className="w-full bg-slate-950/80 border border-orange-500/50 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all text-slate-200 placeholder:text-slate-700 hover:border-orange-500 shadow-inner h-[64px]"
                  />
                </div>
                <button
                  onClick={handleOpenModal}
                  className="px-8 py-4 bg-pink-500 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] flex items-center justify-center gap-2 whitespace-nowrap h-[64px]"
                >
                  <Sparkles size={20} />
                  Gợi ý
                </button>
              </div>

              {/* Row 2: Item Counter */}
              <div className="flex items-center gap-2 ml-1 pt-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Đã chọn:</span>
                <span className="text-2xl font-black text-pink-500 drop-shadow-[0_0_12px_rgba(236,72,153,0.6)]">
                  {objectInput.split(',').map(s => s.trim()).filter(Boolean).length}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">vật phẩm</span>
              </div>
            </div>

            {/* Row 3: Brand Input Group */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 ml-1">
                <label className="block text-sm font-bold text-cyan-500 uppercase tracking-wider">
                  Tên Kênh / Thương Hiệu
                </label>
                <span className="text-[10px] font-medium text-amber-400 italic uppercase tracking-tighter">
                  (Không bắt buộc)
                </span>
              </div>
              <input
                type="text"
                value={brandInput}
                onChange={(e) => setBrandInput(e.target.value)}
                placeholder="Ví dụ: VanTheWeb"
                className="w-full bg-slate-950/80 border border-orange-500/50 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all text-slate-200 placeholder:text-slate-700 hover:border-orange-500 shadow-inner h-[64px]"
              />
            </div>

            {/* Row 4: Generate Button */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={!objectInput.trim()}
                className="w-full sm:w-auto px-16 py-5 bg-gradient-to-r from-cyan-600 to-cyan-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 uppercase tracking-widest"
              >
                TẠO PROMPT
              </button>
            </div>
          </div>
        </motion.section>

        {/* Modal Suggestions */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-[2rem] overflow-hidden flex flex-col max-h-[85vh] shadow-2xl"
              >
                {/* Modal Header */}
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-orange-500 rounded-lg">
                      <Sparkles className="text-white" size={16} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">Gợi ý chủ đề mẫu</h2>
                  </div>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-grow overflow-y-auto p-5 custom-scrollbar bg-white">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SUGGESTIONS.map((item) => {
                      const isSelected = selectedInModal.some(s => s.toLowerCase() === item.vn.toLowerCase());
                      return (
                        <button
                          key={item.vn}
                          onClick={() => toggleModalItem(item.vn)}
                          className={`group p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                            isSelected
                              ? 'bg-orange-500 border-orange-500 shadow-md shadow-orange-500/20'
                              : 'bg-white border-slate-100 hover:border-orange-500/30 hover:bg-orange-50/20'
                          }`}
                        >
                          <div className="relative z-10">
                            <h3 className={`font-bold text-sm leading-tight mb-0.5 ${
                              isSelected ? 'text-white' : 'text-slate-800'
                            }`}>
                              {item.vn}
                            </h3>
                            <p className={`text-[10px] font-medium italic ${
                              isSelected ? 'text-orange-100' : 'text-slate-400'
                            }`}>
                              {item.en}
                            </p>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-white/20 rounded-full p-0.5">
                              <Check size={10} className="text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-5 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-slate-600 text-sm font-medium">
                    Đã chọn: <span className="text-orange-600 font-bold">{selectedInModal.length}</span>
                  </p>
                  <button
                    onClick={confirmModalSelection}
                    disabled={selectedInModal.length === 0}
                    className="w-full sm:w-auto px-8 py-3 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-300 text-white font-black text-base rounded-xl transition-all shadow-md shadow-orange-600/20 active:scale-95 uppercase tracking-wider"
                  >
                    XÁC NHẬN ({selectedInModal.length})
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {isGenerated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-6 mb-12">
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={downloadImages}
                    className="group relative px-8 py-4 bg-cyan-500 text-black font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center gap-2"
                  >
                    <ImageIcon size={20} />
                    Tải Prompt Ảnh
                  </button>
                  <button
                    onClick={copyAllImagePrompts}
                    className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest flex items-center gap-1 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)] active:scale-95"
                  >
                    {copyAllImagesStatus ? <Check size={12} /> : <Copy size={12} />}
                    {copyAllImagesStatus ? 'Đã sao chép tất cả' : 'Sao chép tất cả ảnh'}
                  </button>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={downloadVideos}
                    className="group relative px-8 py-4 bg-pink-500 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] flex items-center gap-2"
                  >
                    <VideoIcon size={20} />
                    Tải Prompt Video
                  </button>
                  <button
                    onClick={copyAllVideoPrompts}
                    className="text-[10px] font-bold text-pink-400 hover:text-pink-300 transition-colors uppercase tracking-widest flex items-center gap-1 bg-pink-500/10 px-3 py-1.5 rounded-lg border border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.1)] active:scale-95"
                  >
                    {copyAllVideosStatus ? <Check size={12} /> : <Copy size={12} />}
                    {copyAllVideosStatus ? 'Đã sao chép tất cả' : 'Sao chép tất cả video'}
                  </button>
                </div>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-12">
              {generatedResults.map((result, idx) => (
                <div key={idx} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-grow bg-slate-800" />
                    <h2 className="text-xl font-black text-cyan-400 uppercase tracking-widest px-4 py-2 bg-slate-900/50 rounded-xl border border-slate-800">
                      {idx + 1}. {result.name}
                    </h2>
                    <div className="h-px flex-grow bg-slate-800" />
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Prompt Card */}
                    <div className="flex flex-col h-full bg-slate-900/60 rounded-[2rem] border border-slate-800 overflow-hidden backdrop-blur-sm">
                      <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-cyan-500/10 rounded-xl">
                            <ImageIcon className="text-cyan-400" size={20} />
                          </div>
                          <h3 className="font-bold text-lg">Prompt Ảnh</h3>
                        </div>
                        <button 
                          onClick={() => handleCopy(result.image, idx, 'image')}
                          className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-cyan-400"
                        >
                          {copiedIndex?.idx === idx && copiedIndex?.type === 'image' ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                        </button>
                      </div>
                      <div className="p-8 flex-grow">
                        <p className="text-slate-300 leading-relaxed font-mono text-sm whitespace-pre-wrap">
                          {result.image}
                        </p>
                      </div>
                    </div>

                    {/* Video Prompt Card */}
                    <div className="flex flex-col h-full bg-slate-900/60 rounded-[2rem] border border-slate-800 overflow-hidden backdrop-blur-sm">
                      <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-pink-500/10 rounded-xl">
                            <VideoIcon className="text-pink-400" size={20} />
                          </div>
                          <h3 className="font-bold text-lg">Prompt Video</h3>
                        </div>
                        <button 
                          onClick={() => handleCopy(result.video, idx, 'video')}
                          className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-pink-400"
                        >
                          {copiedIndex?.idx === idx && copiedIndex?.type === 'video' ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                        </button>
                      </div>
                      <div className="p-8 flex-grow">
                        <p className="text-slate-300 leading-relaxed font-mono text-sm whitespace-pre-wrap">
                          {result.video}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer removed */}
      </div>
    </div>
  );
}
