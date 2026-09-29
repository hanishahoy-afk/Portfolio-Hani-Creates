<?php
session_start();

if (isset($_SESSION['user'])) {
    header("Location: index.php");
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($name) || empty($phone) || empty($email) || empty($password)) {
        $error = 'تمام خانے پر کرنا لازمی ہے! / All fields are strictly required.';
    } else {
        $_SESSION['user'] = [
            'name'  => $name,
            'email' => $email,
            'phone' => $phone,
            'role'  => 'VIP Client'
        ];
        header("Location: index.php");
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="ur" dir="rtl" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VIP Client Sign Up - Hani Creates</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700;800&family=Manrope:wght@500;700;800&family=Noto+Sans+Arabic:wght@500;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="styles.css">
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-[#09090C] text-white min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
  
  <div class="hero-glow"></div>
  <div class="hero-glow-alt"></div>

  <div class="auth-gate-card w-full max-w-md bg-[#131219] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
    <div class="text-center mb-6">
      <div class="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden border-2 border-rose-500/80 shadow-[0_0_20px_rgba(225,29,72,0.4)]">
        <img src="images/profile.jpg" alt="Hani Creates" class="w-full h-full object-cover">
      </div>
      <h1 class="text-2xl font-black text-white tracking-tight">Create VIP Account</h1>
      <p class="text-xs text-slate-400 mt-1">ہانی کری ایٹس پر نیا کلائنٹ اکاؤنٹ رجسٹر کریں</p>
    </div>

    <?php if ($error): ?>
      <div class="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold mb-5 flex items-center gap-2">
        <i data-lucide="alert-circle" class="w-4 h-4 text-rose-400 shrink-0"></i>
        <span><?= htmlspecialchars($error) ?></span>
      </div>
    <?php endif; ?>

    <form method="POST" action="signup.php" class="space-y-3.5">
      <div>
        <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
          پورا نام (Full Name) *
        </label>
        <input 
          type="text" 
          name="name" 
          required 
          placeholder="e.g. Alex Johnson / احمد علی"
          class="w-full rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 bg-[#1A1924] border border-white/[0.12]"
        >
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
          واٹس ایپ نمبر (WhatsApp / Phone) *
        </label>
        <input 
          type="text" 
          name="phone" 
          required 
          placeholder="e.g. 0300 1234567"
          class="w-full rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 bg-[#1A1924] border border-white/[0.12]"
        >
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
          ای میل ایڈریس (Email Address) *
        </label>
        <input 
          type="email" 
          name="email" 
          required 
          placeholder="client@example.com"
          class="w-full rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 bg-[#1A1924] border border-white/[0.12]"
        >
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
          پاس ورڈ (Password) *
        </label>
        <input 
          type="password" 
          name="password" 
          required 
          placeholder="••••••••"
          class="w-full rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 bg-[#1A1924] border border-white/[0.12]"
        >
      </div>

      <button 
        type="submit" 
        class="btn-primary w-full py-4 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 mt-5 shadow-[0_4px_20px_rgba(225,29,72,0.4)]"
      >
        <i data-lucide="user-plus" class="w-4 h-4"></i>
        <span>اکاؤنٹ بنائیں اور داخل ہوں (Sign Up)</span>
      </button>

      <div class="text-center pt-2 text-xs text-slate-400">
        پہلے سے اکاؤنٹ موجود ہے؟ 
        <a href="login.php" class="text-rose-400 font-bold hover:underline">لاگ ان کریں (Sign In)</a>
      </div>
    </form>
  </div>

  <script>lucide.createIcons();</script>
</body>
</html>
