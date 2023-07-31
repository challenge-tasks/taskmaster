<template>
    <div class="wrapper">
        <Header />
        <main>
            <slot />
        </main>
        <Footer />
        
        <SignInModal />
        <SignUpModal />
    </div>
</template>