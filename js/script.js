/**
 * script.js (Projeto Aprendiz 2025)
 * Lógica de interatividade e melhorias por Gemini
 * V4.3 - Solução final com Scroll Hint animado para iOS
 */
document.addEventListener('DOMContentLoaded', function() {

    const courseIcons = {
        'bateria': `<svg class="card-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M783.744 200.64h38.528V908.16h-38.528z" fill="#C2C7E5" /><path d="M822.272 187.584v-18.176h-38.528v18.176h-99.264v35.52h236.992v-35.52zM684.48 251.648h236.992v35.52h-236.992z" fill="#F5BB1B" /><path d="M218.496 200.64h38.528V908.16h-38.528z" fill="#C2C7E5" /><path d="M135.168 138.624l218.88 91.2-13.696 32.832-218.88-91.2z" fill="#F5BB1B" /><path d="M73.024 347.392h317.568v35.52H73.024z" fill="#35464E" /><path d="M88.448 382.848h286.784v135.68H88.448z" fill="#E72845" /><path d="M73.024 518.656h317.568v35.648H73.024z" fill="#35464E" /><path d="M88.448 382.848h286.784v39.104H88.448z" fill="#C7161E" /><path d="M135.872 382.848h42.048v92.416h-42.048zM286.912 382.848h42.112v92.416h-42.112z" fill="#35464E" /><path d="M644.16 347.392h317.568v35.52h-317.568z" fill="#35464E" /><path d="M659.648 382.848h286.72v135.68h-286.72z" fill="#E72845" /><path d="M644.16 518.656h317.568v35.648h-317.568z" fill="#35464E" /><path d="M659.648 382.848h286.72v39.104h-286.72z" fill="#C7161E" /><path d="M707.008 382.848h41.984v92.416h-41.984zM858.112 382.848h41.984v92.416h-41.984z" fill="#35464E" /><path d="M727.36 880.192l-33.408 27.84-52.352-62.72 33.344-27.84zM366.912 817.472l33.408 27.84-52.352 62.72-33.472-27.84z" fill="#C2C7E5" /><path d="M521.664 671.424m-224.96 0a224.96 224.96 0 1 0 449.92 0 224.96 224.96 0 1 0-449.92 0Z" fill="#526C78" /><path d="M521.664 914.176a242.944 242.944 0 0 1-242.688-242.752 242.944 242.944 0 0 1 242.688-242.688 242.944 242.944 0 0 1 242.688 242.688 242.944 242.944 0 0 1-242.688 242.752z m0-449.856a207.36 207.36 0 0 0-207.168 207.104c0 114.24 92.928 207.168 207.168 207.168s207.232-92.928 207.232-207.168a207.424 207.424 0 0 0-207.232-207.104z" fill="#263137" /></svg>`,
        'canto_coral': `<svg class="card-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M698.624 501.376a170.112 170.112 0 0 1-170.112 170.112h-58.496a170.112 170.112 0 0 1-170.112-170.112V250.048a170.048 170.048 0 0 1 170.112-170.112h58.496a170.112 170.112 0 0 1 170.112 170.112v251.328z" fill="#979FCB" /><path d="M725.76 410.624v104.512c0 104.448-87.68 189.12-195.904 189.12H462.464c-108.224 0-195.968-84.672-195.968-189.12V410.624h-31.808v123.904c0 118.912 99.904 215.296 223.04 215.296h76.736c123.264 0 223.104-96.384 223.104-215.296V410.624h-31.808z" fill="#394B97" /><path d="M453.184 719.104h92.16v162.944h-92.16z" fill="#394B97" /><path d="M734.656 944v-12.224c0-40.896-38.976-74.048-87.232-74.048h-296.32c-48.128 0-87.232 33.216-87.232 74.048v12.224h470.784z" fill="#394B97" /><path d="M520.896 225.088h174.464v41.152H520.896zM298.944 225.088h174.464v41.152H298.944zM520.896 297.536h174.464v41.152H520.896zM298.944 297.536h174.464v41.152H298.944zM520.896 375.68h174.464v41.216H520.896zM298.944 375.68h174.464v41.216H298.944zM520.896 448.256h174.464v41.088H520.896zM298.944 448.256h174.464v41.088H298.944z" fill="#5161A4" /></svg>`,
        'contrabaixo': `<svg class="card-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M160.832 521.536l-17.216 11.392-36.032 33.664M153.984 519.744l-25.792 21.76c-10.88 9.344-27.456 23.296-27.456 23.296" fill="#D94437" /><path d="M469.184 814.464c0.64-26.432-10.752-88.832 32.96-132.928 44.992-45.504 137.024-58.624 143.04-63.68 16.256-14.784 22.848-33.728 27.584-53.12-45.504 15.04-110.528-34.176-148.48-114.24-23.936-50.56-10.304-123.264-2.56-160.576-26.88-6.848-53.248-4.608-80.064 17.984-21.696 18.368-40.64 78.272-86.208 124.224-64 64.64-153.92 65.664-190.336 86.464-13.696 6.272-31.04 18.88-47.808 35.776a229.76 229.76 0 0 0-24 28.672 171.2 171.2 0 0 0 15.488 225.856l69.312 68.608a171.52 171.52 0 0 0 220.096 17.728c9.984-6.016 21.888-14.976 33.856-26.176 24.32-22.72 40.064-46.208 37.12-54.592z" fill="#D94437" /><path d="M454.464 694.336c3.648-6.912 13.888-23.296 38.016-47.616 21.056-21.44 79.168-36.352 81.984-38.72 7.744-6.976 5.632-17.728 7.808-26.944-21.504 7.104-75.648-43.264-93.568-81.024-11.264-23.808-16.704-37.952-12.992-55.552-12.608-3.2-12.416 1.024-25.024 11.712-10.24 8.64-19.136 36.864-40.64 58.56-31.04 31.36-79.616 37.76-89.152 43.968l-26.24 16.448c-32.512 32.32-32.512 85.824-0.832 117.12l32.64 32.384a80.832 80.832 0 0 0 114.176-0.64l13.824-29.696z" fill="#FBE9EB" /><path d="M455.616 635.2l-48.384-47.808 432.384-426.112 37.632 37.248z" fill="#5B4037" /><path d="M846.592 256.512l-78.784-43.968 124.8-115.648 73.344 38.784z" fill="#5A4035" /><path d="M278.912 647.488l101.312 100.288-28.416 28.8-101.312-100.352zM332.992 592.832l101.312 100.224-30.848 31.168L302.08 624z" fill="#4B5359" /></svg>`,
        'escaleta': `<svg class="card-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M952.7808 563.4048H172.3904c-26.5728 0-48.0768-21.504-48.0768-48.0768V340.0704c0-26.5728 21.504-48.0768 48.0768-48.0768h780.3904c26.5728 0 48.0768 21.504 48.0768 48.0768v175.2576c0 26.5728-21.5552 48.0768-48.0768 48.0768z" fill="#37B04A" /><path d="M906.6496 538.6752H218.5216c-7.936 0-14.3872-6.4512-14.3872-14.3872V342.016c0-7.936 6.4512-14.3872 14.3872-14.3872h688.128c7.936 0 14.3872 6.4512 14.3872 14.3872v182.272c0 7.9872-6.4512 14.3872-14.3872 14.3872z" fill="#F1F8F0" /><path d="M282.4704 462.592h-27.9552c-2.9696 0-5.376-2.4064-5.376-5.376V327.68h38.7584v129.536c0 2.9696-2.4576 5.376-5.4272 5.376zM351.488 462.592h-27.9552c-2.9696 0-5.376-2.4064-5.376-5.376V327.68h38.7584v129.536c-0.0512 2.9696-2.4576 5.376-5.4272 5.376zM422.8096 462.592h-27.9552c-2.9696 0-5.376-2.4064-5.376-5.376V327.68h38.7584v129.536c-0.0512 2.9696-2.4576 5.376-5.4272 5.376zM724.1216 462.592h-27.9552c-2.9696 0-5.376-2.4064-5.376-5.376V327.68h38.7584v129.536c-0.0512 2.9696-2.4576 5.376-5.4272 5.376zM793.1392 462.592h-27.9552c-2.9696 0-5.376-2.4064-5.376-5.376V327.68h38.7584v129.536c-0.0512 2.9696-2.4576 5.376-5.4272 5.376zM864.4096 462.592h-27.9552c-2.9696 0-5.376-2.4064-5.376-5.376V327.68h38.7584v129.536c0 2.9696-2.4576 5.376-5.4272 5.376zM611.4304 462.592h-27.9552c-2.9696 0-5.376-2.4064-5.376-5.376V327.68h38.7584v129.536c-0.0512 2.9696-2.4576 5.376-5.4272 5.376zM542.4128 462.592h-27.9552c-2.9696 0-5.376-2.4064-5.376-5.376V327.68H547.84v129.536c-0.0512 2.9696-2.4576 5.376-5.4272 5.376z" fill="#272933" /><path d="M660.3264 675.7888H170.4448c-61.952 0-112.384-50.432-112.384-112.384 0-45.5168 27.2384-84.736 66.2528-102.3488v-37.4784c-58.6752 19.4048-101.12 74.752-101.12 139.8272 0 81.2032 66.0992 147.3024 147.3024 147.3024h489.8816v-34.9184z" fill="#CFE0CD" /><path d="M660.3264 675.7888h59.8016v34.9184h-59.8016z" fill="#272933" /></svg>`,
        'flauta': `<svg class="card-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M833.28 154.048l75.136 75.968L136.64 992.64 61.568 916.672z" fill="#EAB528" /><path d="M876.16 112l75.008 75.968-578.112 570.944-75.008-75.968zM158.848 851.456l43.968 44.48-40.832 40.384-43.968-44.416z" fill="#435861" /><path d="M859.584 276.8l19.072 19.328-432.64 426.368-19.072-19.328z" fill="#EDC14A" /><path d="M755.328 267.2l57.152 57.728-37.376 36.992-57.152-57.728zM686.336 335.424l57.024 57.792-37.312 36.8-57.024-57.792zM617.408 403.584l57.024 57.856-37.376 36.864-56.96-57.856zM548.352 471.808l57.024 57.792-37.376 36.864-57.024-57.792zM479.296 539.968l57.024 57.792-37.312 36.864-57.088-57.792z" fill="#EAB528" /></svg>`,
        'saxofone': `<svg class="card-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M448.064 582.912l195.712 262.912-217.984-307.2c4.736 15.488 12.032 30.528 22.272 44.288z" fill="#EAB528" /><path d="M717.504 665.344l69.888 93.76c16.256 22.016 20.544 46.4 9.6 54.592-10.944 8.256-33.216-3.008-49.472-24.96l-290.944-391.04-0.064 0.064-187.136-243.008-73.664 54.848 238.272 349.824a156.16 156.16 0 0 1-2.112-12.224l211.968 298.688 39.232 52.8a146.368 146.368 0 0 0 173.056 48.064 146.496 146.496 0 0 0 62.208-223.04l-97.216-130.56c-44.096-59.456-40.448 37.504-103.616 72.192z" fill="#EAB528" /><path d="M845.312 466.496l-126.336 0.128-1.92 199.936 128.576-0.896z" fill="#EAB528" /><path d="M695.36 467.136h176.64v40.96h-176.64z" fill="#EAB528" /><path d="M280.256 232.768l-155.392 9.408-10.88-57.792 151.68-28.672z" fill="#EAB528" /><path d="M155.328 239.68l-97.216 2.304-8.768-46.336 94.336-17.792z" fill="#435861" /><path d="M342.528 286.528l26.944-20.096 26.752 35.968-26.88 20.032zM400.768 364.8l26.88-20.032 26.816 35.904-26.88 20.096zM459.008 443.136l29.504-21.888 23.68 31.872-29.44 21.952zM517.376 521.536l29.504-21.888 23.616 31.808-29.568 21.888zM575.744 599.808l36.096-26.752 33.792 45.568-36.096 26.816zM651.776 702.08l35.904-26.752 33.92 45.632-35.904 26.752zM769.28 667.328l35.968-26.688 33.856 45.632-36.032 26.688zM818.752 733.696l35.968-26.624 33.728 45.568-35.968 26.624z" fill="#B99240" /></svg>`,
        'teclado': `<svg class="card-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M85.056 191.808h873.536v404.16H85.056z" fill="#DBDBDB" /><path d="M207.232 408.832h75.392v411.584H207.232zM316.736 408.832h75.392v411.584H316.736zM426.176 408.832h75.392v411.584H426.176zM682.24 408.832h75.392v411.584H682.24zM791.744 408.832h75.328v411.584h-75.328z" fill="#263137" /><path d="M928.96 956.352H114.752a61.44 61.44 0 0 1-61.248-61.312V226.368a61.44 61.44 0 0 1 61.248-61.312h814.208a61.44 61.44 0 0 1 61.312 61.312v668.672c0 33.856-27.52 61.312-61.312 61.312zM114.752 202.624a23.808 23.808 0 0 0-23.744 23.808v668.672c0 13.12 10.688 23.808 23.744 23.808h814.208a23.872 23.872 0 0 0 23.808-23.808V226.368a23.872 23.872 0 0 0-23.808-23.808H114.752z" fill="#263137" /><path d="M847.04 393.856m-55.296 0a55.296 55.296 0 1 0 110.592 0 55.296 55.296 0 1 0-110.592 0Z" fill="#F7F8F8" /><path d="M682.304 393.856m-55.296 0a55.296 55.296 0 1 0 110.592 0 55.296 55.296 0 1 0-110.592 0Z" fill="#F7F8F8" /><path d="M127.616 272.96h420.672v198.784H127.616z" fill="#FFFFFF" /><path d="M209.664 312.32h35.904v120.064h-35.904zM265.28 381.76h35.904v50.624h-35.904zM320.896 350.464h35.968v81.92h-35.968zM376.512 338.56h35.904v93.824h-35.904zM430.4 312.32h35.968v120.064h-35.968z" fill="#263137" /></svg>`,
        'teoria_musical': `<svg class="card-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M703.90625 865.90625l-39.9375-15.65625 148.6875-380.0625c6.84375-17.53125-2.4375-37.3125-20.34375-43.125l-260.0625-84.9375c-16.6875-5.4375-34.6875 3.1875-40.875 19.59375L361.8125 704.46875l-61.40625-23.15625 181.875-481.125c6.09375-16.21875 23.8125-24.84375 40.40625-19.78125l389.0625 120.1875c18.1875 5.625 27.84375 25.5 20.90625 43.3125l-199.125 509.0625c-4.6875 11.71875-17.90625 17.53125-29.625 12.9375z" fill="#360682" /><path d="M241.0625 658.15625m-129.375 0a129.375 129.375 0 1 0 258.75 0 129.375 129.375 0 1 0-258.75 0Z" fill="#360682" /><path d="M614.375 802.90625m-129.375 0a129.375 129.375 0 1 0 258.75 0 129.375 129.375 0 1 0-258.75 0Z" fill="#360682" /><path d="M246.53333333 379.36666667L142.43333333 118.66666667c-6.8-16.9 2.4-36 19.8-41.3l107.9-32.9c14.4-4.4 29.7 2.5 36 16.2l13.2 28.8c7.5 16.3-0.9 35.4-17.9 41l-73.7 24.3c-6.9 2.3-10.5 9.9-7.8 16.6L290.33333333 350.96666667c2.1 5.4-0.5 11.4-5.9 13.6l-37.9 14.8z" fill="#E51C5A" /><path d="M211.53333333 379.36666667m-84.8 0a84.8 84.8 0 1 0 169.6 0 84.8 84.8 0 1 0-169.6 0Z" fill="#E51C5A" /></svg>`,
        'violao': `<svg class="card-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M575.744 717.952c19.072-38.656 19.968-52.672 64.704-93.824a579.2 579.2 0 0 1 43.072-35.776c41.216-38.976 63.872-81.344 29.824-118.4l-119.04-129.408c-34.944-37.952-80.384-17.216-123.648 22.464l-13.312 9.152c-8.064 8.384-16.512 16.64-25.472 24.896-50.304 46.208-70.336 48.128-113.408 61.632l-2.048 1.408c-34.112 4.16-106.496 53.568-140.8 85.056-62.016 56.96-84.288 133.632-49.792 171.264 1.856 1.92 3.968 3.712 5.952 5.504l-0.448 0.384 178.624 194.432 1.024-0.896c37.824 27.008 108.736 9.664 165.888-42.816 41.984-38.592 98.816-116.8 98.88-155.072z" fill="#E88F22" /><path d="M859.648 166.528l56.768 61.824-416 382.272-56.768-61.76z" fill="#5B4037" /><path d="M515.904 538.112l-3.072 98.944-98.816-3.072 3.072-98.88z" fill="#3C2622" /><path d="M810.432 163.008l105.152 114.496-82.624 75.84-105.152-114.496z" fill="#5B4037" /><path d="M847.36 153.088l81.472 88.64-139.904 128.64L707.456 281.6z" fill="#B5612C" /><path d="M385.152 740.928l-81.472-88.64 25.152-46.976 105.152 114.496z" fill="#5B4037" /><path d="M844.864 200.64l14.4 15.616-27.072 24.768-14.336-15.616zM789.312 251.648l14.4 15.616-27.072 24.896-14.336-15.68zM866.56 224.256l14.464 15.616-27.008 24.96-14.4-15.616zM811.072 275.328l14.4 15.616-27.008 24.96-14.464-15.616z" fill="#E1C2AD" /></svg>`,
        'violino': `<svg class="card-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M866.944 138.88l78.784 86.784-14.976 13.568-78.72-86.784zM846.72 156.416l78.72 86.848-15.04 13.632-78.72-86.848z" fill="#5B4037" /><path d="M922.304 114.624l49.408 51.712-148.096 131.2-39.04-40.896z" fill="#B5612C" /><path d="M555.648 782.016a95.296 95.296 0 0 1 132.352-137.024l91.776-94.976c36.736-33.344 34.496-95.552-4.992-138.944L663.04 288c-39.424-43.52-101.248-51.776-137.792-18.432L421.632 351.808a95.232 95.232 0 0 1-146.176 121.984l-2.944-3.584-142.72 113.408c0.96 0.896 1.92 1.728 2.816 2.752 41.984 46.336 37.312 118.976-10.56 162.496a121.408 121.408 0 0 1-32.576 20.992l156.096 172.032c39.488 43.52 101.184 51.776 137.856 18.496l172.224-178.368z" fill="#E88F22" /><path d="M132.544 586.368c-0.896-1.024-1.856-1.856-2.816-2.752l-51.328 40.704c-36.672 33.344-34.432 95.552 5.056 138.944l5.952 6.656c11.584-5.12 22.656-12.032 32.576-20.992 47.936-43.584 52.608-116.224 10.56-162.56z" fill="#5B4037" /><path d="M539.2 562.944l-48.128-52.992 350.784-308.288 38.08 41.92zM480.512 637.952l32.576 17.472-97.024 172.352-25.664-13.824zM405.824 556.992l-14.272-34.112-180.864 79.872 11.2 26.88zM265.344 787.392l-24.128-26.56-88 84.928 19.008 20.992z" fill="#5B4037" /></svg>`,
    };

    const siteData = {
        courses: [
            { name: "Teoria Musical", locations: [{ local: "Remoto", schedule: "Sábado, às 14h00" }], icon: "teoria_musical" },
            { name: "Bateria", locations: [ { local: "Lauro de Freitas", schedule: "Sábado, às 16h30" }, { local: "Vista Alegre (remoto)", schedule: "Sábado, às 15h00" } ], icon: "bateria" },
            { name: "Canto Coral", locations: [{ local: "Pituba", schedule: "Sábado, às 15h00 (Quinzenalmente)" }], icon: "canto_coral" },
            { name: "Contrabaixo", locations: [{ local: "Pituba", schedule: "Quinta-feira, após o culto" }, { local: "Alto de Coutos", schedule: "Sábado, às 16h00" }], icon: "contrabaixo" },
            { name: "Escaleta", locations: [ { local: "Itinga", schedule: "Sábado, às 17h30" }, { local: "Lauro de Freitas", schedule: "Sábado, às 17h00" }, { local: "Mirantes de Periperi", schedule: "Domingo após a EBD" } ], icon: "escaleta" },
            { name: "Flauta Doce", locations: [ { local: "Jardim Valéria", schedule: "Sábado, às 17h00" } ], icon: "flauta" },
            { name: "Flauta Transversal", locations: [ { local: "Boca do Rio", schedule: "Sábado, às 15h00" }, { local: "Brotas", schedule: "Sábado, às 20h10" } ], icon: "flauta" },
            { name: "Saxofone", locations: [{ local: "Brotas", schedule: "Terça-feira, às 20h15" }], icon: "saxofone" },
            { name: "Teclado", locations: [ { local: "Brotas", schedule: "Terça-feira, às 20h15" }, { local: "Guarani", schedule: "Domingo, às 15h00" }, { local: "Lauro de Freitas", schedule: "Sábado, às 17h00" }, { local: "Pituba", schedule: "A definir" } ], icon: "teclado" },
            { name: "Violão I", locations: [ { local: "Alto de Coutos", schedule: "Domingo, após EBD" }, { local: "Boca do Rio", schedule: "Sábado, às 15h00" }, { local: "Brotas", schedule: "Terça-feira, às 20h15" }, { local: "Fazenda Coutos", schedule: "A definir" }, { local: "Guarani", schedule: "Domingo, às 16h00" }, { local: "Jardim Valéria", schedule: "Seg, Qua, Sex, às 18:15" }, { local: "Lauro de Freitas", schedule: "Sábado, às 17h00" }, { local: "Mirantes de Periperi", schedule: "Sábado, às 17h00" } ], icon: "violao" },
            { name: "Violão II", locations: [{ local: "Pituba", schedule: "Terça-feira, após o culto" }], icon: "violao" },
            { name: "Violino", locations: [ { local: "Brotas", schedule: "Sábado, às 10h30" } ], icon: "violino" }
        ],
        downloads: [
            { name: "Apostila de Teoria Musical", file: "apostilas/Apostila_Teoria_Musical.pdf", thumbnail: "imagens/covers/Apostila_Teoria_Musical.png" },
            { name: "Apostila de Violão", file: "apostilas/Apostila_Violao.pdf", thumbnail: "imagens/covers/Apostila_Violao.png" },
            { name: "Apostila de Teclado", file: "apostilas/Apostila_Teclado.pdf", thumbnail: "imagens/covers/Apostila_Teclado.png" },
            { name: "Apostila de Contrabaixo", file: "apostilas/Apostila_Contrabaixo.pdf", thumbnail: "imagens/covers/Apostila_Contrabaixo.png" },
            { name: "Apostila de Flauta Transversal", file: "apostilas/Apostila_Flauta Transversal.pdf", thumbnail: "imagens/covers/Apostila_Flauta_Transversal.png" },
            { name: "Apostila de Saxofone", file: "apostilas/Apostila_Saxofone.pdf", thumbnail: "imagens/covers/Apostila_Saxofone.png" },
            { name: "Apostila de Violino", file: "apostilas/Apostila_Violino.pdf", thumbnail: "imagens/covers/Apostila_Violino.png" },
            { name: "Apostila de Escaleta", file: "apostilas/Apostila_Escaleta.pdf", thumbnail: "imagens/covers/Apostila_Escaleta.png" },
            { name: "Apostila de Bateria", file: "apostilas/Apostila_Bateria.pdf", thumbnail: "imagens/covers/Apostila_Bateria.png" }
        ],
        contactTopics: [
            "Sobre o Projeto Aprendiz", "Gestão do Projeto", "Teoria Musical", "Bateria", "Canto Coral",
            "Contrabaixo", "Escaleta", "Flauta Doce", "Flauta Transversal",
            "Saxofone", "Teclado", "Violão I", "Violão II", "Violino", "Outro (Especifique na mensagem)"
        ],
        responsibleEmails: {
            "Sobre o Projeto Aprendiz": "rcpereiracruz@gmail.com",
            "Gestão do Projeto": "rcpereiracruz@gmail.com",
            "Outro (Especifique na mensagem)": "rcpereiracruz@gmail.com",
            "Teoria Musical": { "Remoto": "bsantos.tiago@icloud.com" },
            "Bateria": {
                "Lauro de Freitas": "rios.dan4002@gmail.com",
                "Vista Alegre (remoto)": "bds.marcelotecboatt.digital@gmail.com"
            },
            "Canto Coral": { "Pituba": "anedai_barros@yahoo.com.br" },
            "Contrabaixo": { "Pituba": "flaviofranzin1976@gmail.com" },
            "Escaleta": {
                "Itinga": "r.pedreira88@gmail.com",
                "Lauro de Freitas": "caualopes.icm@gmail.com",
                "Mirantes de Periperi": "cachoeira405@gmail.com"
            },
            "Flauta Doce": { "Jardim Valéria": "alexandre.magnos.br@gmail.com" },
            "Flauta Transversal": {
                "Boca do Rio": "guimaraesanajuli@gmail.com",
                "Brotas": "tonylucas10@gmail.com"
            },
            "Saxofone": { "Brotas": "tonylucas10@gmail.com" },
            "Teclado": {
                "Brotas": "tonylucas10@gmail.com",
                "Guarani": "queirozd013@gmail.com",
                "Lauro de Freitas": "leonardobomfimsantos1@gmail.com",
                "Pituba": "cvitor.sousa98@gmail.com"
            },
            "Violão I": {
                "Alto de Coutos": "sukasantana0@gmail.com",
                "Boca do Rio": "alana.cruzsilva1@gmail.com",
                "Brotas": "tonylucas10@gmail.com",
                "Guarani": "geoicm@gmail.com",
                "Lauro de Freitas": "bralsantos18@gmail.com",
                "Mirantes de Periperi": "cleyton.icm1225@gmail.com",
                "Jardim Valéria": "alanmaranata33@gmail.com",
                "Fazenda Coutos": "milenapinheiro365@gmail.com",
            },
            "Violão II": { "Pituba": "flaviofranzin1976@gmail.com" },
            "Violino": { "Brotas": "tonylucas10@gmail.com" }
        }
    };

    const courseLocations = {};
    siteData.courses.forEach(course => {
        courseLocations[course.name] = course.locations.map(location => location.local);
    });
    const topicsWithoutLocation = ["Sobre o Projeto Aprendiz", "Gestão do Projeto", "Outro (Especifique na mensagem)"];

    function setupModal(modalElement) {
        if (!modalElement) return { open: () => {}, close: () => {} };
        const closeBtn = modalElement.querySelector('.modal-close');

        const open = () => {
            modalElement.classList.add('is-visible');
            document.body.classList.add('modal-open');
        };
        const close = () => {
            modalElement.classList.remove('is-visible');
            document.body.classList.remove('modal-open');
            if (modalElement.id === 'pdf-modal') {
                modalElement.querySelector('iframe').src = 'about:blank';
            }
        };

        if(closeBtn) {
            closeBtn.addEventListener('click', close);
        }
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                close();
            }
        });

        return { open, close };
    }

    const pdfModal = document.getElementById('pdf-modal');
    const pdfModalControls = setupModal(pdfModal);

    function setupSlider(containerId, gridId, prevBtnId, nextBtnId, cardClickCallback) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const viewport = container.querySelector('.slider-viewport');
        const grid = document.getElementById(gridId);
        const nextBtn = document.getElementById(nextBtnId);
        const prevBtn = document.getElementById(prevBtnId);
        const dotsContainer = document.getElementById('testimonial-dots');

        if (!viewport || !grid || !nextBtn || !prevBtn) return;

        let currentIndex = 0;
        let autoPlayInterval;

        let isDragging = false,
            isIntentionalDrag = false,
            startPos = { x: 0, y: 0 },
            currentTranslate = 0,
            prevTranslate = 0,
            animationID,
            dragStartTime,
            draggedElement;
            
        const DRAG_THRESHOLD = 10;
        const CLICK_THRESHOLD_MS = 300;

        const getPosition = (e) => ({
            x: e.touches ? e.touches[0].clientX : e.clientX,
            y: e.touches ? e.touches[0].clientY : e.clientY,
        });

        function dragStart(e) {
            startPos = getPosition(e);
            dragStartTime = Date.now();
            isDragging = true;
            isIntentionalDrag = false;
            draggedElement = e.target;
            animationID = requestAnimationFrame(animation);
            grid.style.transition = 'none';
            stopAutoPlay();
        }

        function dragMove(e) {
            if (!isDragging) return;
            const currentPosition = getPosition(e);
            const moveX = currentPosition.x - startPos.x;
            const moveY = currentPosition.y - startPos.y;

            if (!isIntentionalDrag) {
                if (Math.abs(moveX) > DRAG_THRESHOLD && Math.abs(moveX) > Math.abs(moveY)) {
                    isIntentionalDrag = true; 
                    viewport.classList.add('is-dragging');
                } else if (Math.abs(moveY) > DRAG_THRESHOLD && Math.abs(moveY) > Math.abs(moveX)) {
                    isDragging = false; 
                    return;
                }
            }
        
            if (isIntentionalDrag) {
                if(e.cancelable) e.preventDefault();
                currentTranslate = prevTranslate + moveX;
            }
        }

        function animation() {
            if (isIntentionalDrag) {
                grid.style.transform = `translateX(${currentTranslate}px)`;
            }
            if (isDragging) {
                requestAnimationFrame(animation);
            }
        }

        function dragEnd() {
            cancelAnimationFrame(animationID);
            const dragEndTime = Date.now();
            
            grid.style.transition = ''; 
        
            if (isIntentionalDrag) {
                const movedBy = currentTranslate - prevTranslate;
                if (movedBy < -100) goNext(containerId === 'testimonial-slider-container');
                else if (movedBy > 100) goPrev(containerId === 'testimonial-slider-container');
                else updateSlider(); 
            } else if (isDragging && dragEndTime - dragStartTime < CLICK_THRESHOLD_MS) {
                if (cardClickCallback) {
                    const card = draggedElement.closest('.download-card');
                    if (card) cardClickCallback(card);
                }
            }
        
            viewport.classList.remove('is-dragging');
            isDragging = false;
            isIntentionalDrag = false;
            startAutoPlay();
        }

        const goToSlide = (index) => {
            currentIndex = index;
            updateSlider();
        };

        const createDots = () => {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const cards = Array.from(grid.children);
            cards.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add('slider-dot');
                dot.addEventListener('click', () => {
                    stopAutoPlay();
                    goToSlide(i);
                    startAutoPlay();
                });
                dotsContainer.appendChild(dot);
            });
        };
        
        const updateDots = () => {
            if (!dotsContainer) return;
            const dots = Array.from(dotsContainer.children);
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        };
        
        const goNext = (loop = false) => {
            const cards = Array.from(grid.children);
            if (cards.length === 0) return;
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(grid).gap) || 0;
            const stepWidth = cardWidth + gap;
            const itemsInView = Math.floor(viewport.offsetWidth / stepWidth);
            const maxIndex = cards.length - itemsInView;

            currentIndex++;
            if (currentIndex > maxIndex) {
                currentIndex = loop ? 0 : maxIndex;
            }
            updateSlider();
        };
        
        const goPrev = (loop = false) => {
            const cards = Array.from(grid.children);
            if (cards.length === 0) return;
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(grid).gap) || 0;
            const stepWidth = cardWidth + gap;
            const itemsInView = Math.floor(viewport.offsetWidth / stepWidth);
            const maxIndex = cards.length - itemsInView;
            
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = loop ? maxIndex : 0;
            }
            updateSlider();
        };

        const startAutoPlay = () => {
            if (containerId === 'testimonial-slider-container') {
                stopAutoPlay();
                autoPlayInterval = setInterval(() => goNext(true), 5000);
            }
        };

        const stopAutoPlay = () => { clearInterval(autoPlayInterval); };

        function updateSlider() {
            const totalContentWidth = grid.scrollWidth;
            const viewportWidth = viewport.offsetWidth;
            const cards = Array.from(grid.children);

            if (cards.length === 0 || totalContentWidth <= viewportWidth) {
                container.classList.add('center-content');
                grid.style.transform = 'translateX(0px)';
                prevBtn.disabled = true;
                nextBtn.disabled = true;
                currentIndex = 0;
                prevTranslate = 0;
                currentTranslate = 0;
                return;
            } else {
                container.classList.remove('center-content');
            }

            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(grid).gap) || 0;
            const stepWidth = cardWidth + gap;
            const maxScroll = totalContentWidth - viewportWidth;

            if (currentIndex < 0) currentIndex = 0;

            let offset = -currentIndex * stepWidth;

            if (offset > 0) offset = 0;
            if (Math.abs(offset) > maxScroll) offset = -maxScroll;

            grid.style.transform = `translateX(${offset}px)`;
            prevTranslate = offset;
            currentTranslate = offset;
            
            if (dotsContainer) {
                updateDots();
            }

            if (containerId !== 'testimonial-slider-container') {
                prevBtn.disabled = currentIndex === 0;
                const itemsInView = Math.max(1, Math.floor(viewportWidth / stepWidth));
                nextBtn.disabled = currentIndex >= cards.length - itemsInView;
            } else {
                prevBtn.disabled = false;
                nextBtn.disabled = false;
            }
        }
        
        if (dotsContainer) {
            createDots();
        }
        
        viewport.addEventListener('dragstart', (e) => e.preventDefault());
        viewport.addEventListener('mousedown', dragStart);
        viewport.addEventListener('touchstart', dragStart, { passive: true });
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('touchmove', dragMove, { passive: false });
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);

        nextBtn.addEventListener('click', () => { stopAutoPlay(); goNext(containerId === 'testimonial-slider-container'); startAutoPlay(); });
        prevBtn.addEventListener('click', () => { stopAutoPlay(); goPrev(containerId === 'testimonial-slider-container'); startAutoPlay(); });
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);

        const debouncedUpdate = debounce(updateSlider, 100);
        
        window.addEventListener('resize', debouncedUpdate);

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) { 
                setTimeout(() => { 
                    updateSlider(); 
                    startAutoPlay(); 
                }, 100); 
            } else { 
                stopAutoPlay(); 
            }
        }, { threshold: 0.1 });

        observer.observe(container);

        return { update: () => { currentIndex = 0; updateSlider(); } };
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function setupScheduleSection() {
        const courseGrid = document.getElementById('course-grid');
        const filterCursoWrapper = document.getElementById('custom-curso-select');
        const filterLocalWrapper = document.getElementById('custom-local-filter-select');
        const filterDiaWrapper = document.getElementById('custom-dia-select');
        const noResultsMessage = document.getElementById('no-results-message');

        if (!courseGrid || !filterCursoWrapper || !filterLocalWrapper || !filterDiaWrapper) return;

        const courseSlider = setupSlider('course-slider-container', 'course-grid', 'course-prev', 'course-next');

        const dayPatterns = {
            'Domingo': /\b(domingo|dom)\b/i,
            'Segunda-feira': /\b(segunda-feira|seg)\b/i,
            'Terça-feira': /\b(terça-feira|terça|ter)\b/i,
            'Quarta-feira': /\b(quarta-feira|quarta|qua)\b/i,
            'Quinta-feira': /\b(quinta-feira|quinta|qui)\b/i,
            'Sexta-feira': /\b(sexta-feira|sexta|sex)\b/i,
            'Sábado': /\b(sábado|sáb|sab)\b/i
        };

        const getDaysFromSchedule = (schedule) => {
            const scheduleLower = schedule.toLowerCase();
            const daysFound = new Set();
            for (const dayName in dayPatterns) {
                if (dayPatterns[dayName].test(scheduleLower)) {
                    daysFound.add(dayName);
                }
            }
            return Array.from(daysFound);
        };

        const renderCourses = (coursesToRender) => {
            courseGrid.innerHTML = '';
            noResultsMessage.style.display = coursesToRender.length === 0 ? 'block' : 'none';

            coursesToRender.forEach(course => {
                const card = document.createElement('div');
                card.className = 'course-card-interactive';

                const locationsHTML = course.locations.map(location => `
                    <div class="location-item">
                        <span class="location-name">${location.local}</span>
                        <span class="location-schedule ${location.schedule.toLowerCase() === 'a definir' ? 'tbd' : ''}">${location.schedule}</span>
                    </div>`).join('');

                const iconSvg = courseIcons[course.icon] || courseIcons['teoria_musical'];

                card.innerHTML = `
                    <div class="card-header">
                        <div class="card-icon">${iconSvg}</div>
                        <h3 class="card-title">${course.name}</h3>
                    </div>
                    <div class="card-body">${locationsHTML}</div>`;
                courseGrid.appendChild(card);
                
                const cardBody = card.querySelector('.card-body');
                if (cardBody.scrollHeight > cardBody.clientHeight) {
                    cardBody.classList.add('is-scrollable');
                    
                    const chevron = document.createElement('div');
                    chevron.className = 'scroll-chevron';
                    chevron.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>`;
                    card.appendChild(chevron);

                    cardBody.addEventListener('scroll', () => {
                        const isAtEnd = cardBody.scrollHeight - cardBody.scrollTop <= cardBody.clientHeight + 1;
                        cardBody.classList.toggle('is-scrolled-to-end', isAtEnd);
                    });
                }
            });

            if(courseSlider && typeof courseSlider.update === 'function') {
                setTimeout(courseSlider.update, 50);
            }
        };

        const updateDisplay = () => {
            const selectedCurso = filterCursoWrapper.getAttribute('data-selected-value') || 'Todos os Cursos';
            const selectedLocal = filterLocalWrapper.getAttribute('data-selected-value') || 'Todos os Locais';
            const selectedDia = filterDiaWrapper.getAttribute('data-selected-value') || 'Todos os Dias';

            const filteredCourses = siteData.courses.map(course => {
                if (selectedCurso !== 'Todos os Cursos' && course.name !== selectedCurso) return null;

                const matchingLocations = course.locations.filter(location =>
                    (selectedLocal === 'Todos os Locais' || location.local === selectedLocal) &&
                    (selectedDia === 'Todos os Dias' || getDaysFromSchedule(location.schedule).includes(selectedDia))
                );

                return matchingLocations.length > 0 ? { ...course, locations: matchingLocations } : null;
            }).filter(Boolean);

            renderCourses(filteredCourses);
        };

        const allCourseNames = ['Todos os Cursos', ...siteData.courses.map(c => c.name).sort()];
        const allLocationNames = ['Todos os Locais', ...[...new Set(siteData.courses.flatMap(c => c.locations.map(l => l.local)))].sort()];
        const allDayNames = ['Todos os Dias', ...[...new Set(siteData.courses.flatMap(c => c.locations.flatMap(l => getDaysFromSchedule(l.schedule))))].sort((a, b) => {
            const order = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
            return order.indexOf(a) - order.indexOf(b);
        })];

        populateSelect('custom-curso-select', allCourseNames, true);
        populateSelect('custom-local-filter-select', allLocationNames, true);
        populateSelect('custom-dia-select', allDayNames, true);

        setupCustomSelect('custom-curso-select', updateDisplay);
        setupCustomSelect('custom-local-filter-select', updateDisplay);
        setupCustomSelect('custom-dia-select', updateDisplay);

        updateDisplay();
    }

    function setupDownloadsSection() {
        const downloadGrid = document.getElementById('download-grid');
        if (!downloadGrid) return;
    
        siteData.downloads.forEach(download => {
            const card = document.createElement('div');
            card.className = 'download-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.dataset.pdfFile = download.file;
            card.dataset.pdfName = download.name;
    
            card.innerHTML = `
                <div class="thumbnail">
                    <img src="${download.thumbnail}" alt="Capa da ${download.name}">
                </div>
                <h4>${download.name}</h4>
            `;
            downloadGrid.appendChild(card);
        });
    
        const handleCardClick = (card) => {
            if (!card) return;
            const pdfFile = card.dataset.pdfFile;
            const pdfName = card.dataset.pdfName;

            if (window.innerWidth <= 768) {
                const link = document.createElement('a');
                link.href = encodeURI(pdfFile);
                link.download = pdfName.replace(/ /g, '_') + '.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else if (pdfModal) {
                pdfModal.querySelector('#pdf-modal-title').textContent = pdfName;
                pdfModal.querySelector('#pdf-iframe').src = encodeURI(pdfFile);
                pdfModalControls.open();
            }
        };

        setupSlider('download-slider-container', 'download-grid', 'download-prev', 'download-next', handleCardClick);
    }
    
    function populateSelect(selectId, data, searchable = false) {
        const customSelect = document.getElementById(selectId);
        if (!customSelect) return;
        const optionsList = customSelect.querySelector('.custom-select-options');
        optionsList.innerHTML = '';

        if (searchable) {
            const searchContainer = document.createElement('li');
            searchContainer.className = 'search-container';
            searchContainer.innerHTML = `
                <div class="search-input-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="search-icon" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                    <input type="text" class="search-input" placeholder="Pesquisar...">
                </div>`;
            searchContainer.addEventListener('click', e => e.stopPropagation());
            optionsList.appendChild(searchContainer);
        }

        data.forEach(item => {
            const optionElement = document.createElement('li');
            optionElement.className = 'custom-select-option';
            const value = typeof item === 'object' ? item.name : item;
            optionElement.textContent = value;
            optionElement.setAttribute('data-value', value);
            optionsList.appendChild(optionElement);
        });
    }

    function setupCustomSelect(selectId, onSelectCallback = () => {}) {
        const customSelect = document.getElementById(selectId);
        if (!customSelect) return;
        const trigger = customSelect.querySelector('.custom-select-trigger');
        const optionsList = customSelect.querySelector('.custom-select-options');
        const triggerText = trigger.querySelector('span');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-select-wrapper.is-open').forEach(openSelect => {
                if (openSelect !== customSelect) openSelect.classList.remove('is-open');
            });
            customSelect.classList.toggle('is-open');

            const searchInput = optionsList.querySelector('.search-input');
            if (customSelect.classList.contains('is-open') && searchInput) {
                searchInput.value = '';
                searchInput.focus();
                const options = optionsList.querySelectorAll('.custom-select-option');
                options.forEach(option => { option.style.display = ''; });
            }
        });

        const searchInput = optionsList.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const filter = searchInput.value.toLowerCase();
                const options = optionsList.querySelectorAll('.custom-select-option');
                options.forEach(option => {
                    const text = option.textContent.toLowerCase();
                    option.style.display = text.includes(filter) ? '' : 'none';
                });
            });
        }

        optionsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('custom-select-option')) {
                const selectedValue = e.target.getAttribute('data-value');
                triggerText.textContent = selectedValue;

                customSelect.setAttribute('data-selected-value', selectedValue);

                optionsList.querySelector('.is-selected')?.classList.remove('is-selected');
                e.target.classList.add('is-selected');
                customSelect.classList.remove('is-open');
                onSelectCallback(selectedValue);
            }
        });
    }

    function setupMobileMenu() {
        const menuButton = document.getElementById('menu-button');
        const mainNav = document.getElementById('main-nav');
        if (!menuButton || !mainNav) return;
        const navLinks = mainNav.querySelectorAll('a');
        const toggleMenu = () => {
            menuButton.classList.toggle('is-active');
            mainNav.classList.toggle('is-open');
        };
        menuButton.addEventListener('click', toggleMenu);
        navLinks.forEach(link => link.addEventListener('click', () => {
            if (mainNav.classList.contains('is-open')) toggleMenu();
        }));
    }

    function setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        populateSelect('custom-motivo-select', [{ name: 'Dúvida' }, { name: 'Sugestão' }]);
        setupCustomSelect('custom-motivo-select');

        populateSelect('custom-topico-select', siteData.contactTopics.map(name => ({ name })));
        setupCustomSelect('custom-topico-select', (selectedTopic) => {
            const localGroup = document.getElementById('local-curso-group');
            const localSelectWrapper = document.getElementById('custom-local-select');

            if (courseLocations[selectedTopic] && !topicsWithoutLocation.includes(selectedTopic)) {
                const localTriggerText = localSelectWrapper.querySelector('.custom-select-trigger span');
                populateSelect('custom-local-select', courseLocations[selectedTopic].map(loc => ({ name: loc })));
                localTriggerText.textContent = 'Selecione o local';
                localSelectWrapper.removeAttribute('data-selected-value');
                localGroup.style.display = 'block';
            } else {
                localGroup.style.display = 'none';
                localSelectWrapper.removeAttribute('data-selected-value');
            }
        });
        setupCustomSelect('custom-local-select');

        const emailInput = document.getElementById('email-contato');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        function validateEmail() {
            if (!emailInput) return true;
            const emailValue = String(emailInput.value).trim().toLowerCase();
            const isValid = emailValue !== '' && emailRegex.test(emailValue);

            emailInput.classList.toggle('invalid', !isValid);
            if (emailError) {
                emailError.style.display = isValid ? 'none' : 'block';
                emailError.textContent = emailValue === '' ? 'O campo de e-mail é obrigatório.' : 'Formato de e-mail inválido.';
            }
            return isValid;
        }

        function validateForm() {
            const isEmailValid = validateEmail();
            return isEmailValid;
        }

        if (emailInput) {
            emailInput.addEventListener('blur', validateEmail);
        }

        emailjs.init('YOdOaNxuEZhrPJyWL');

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formStatus = document.getElementById('form-status');
            const loaderOverlay = document.getElementById('form-loader-contato');

            if (!validateForm()) {
                if (formStatus) {
                    formStatus.textContent = 'Por favor, corrija os erros no formulário.';
                    formStatus.style.display = 'block';
                }
                return;
            }

            if (loaderOverlay) {
                const iconContainer = loaderOverlay.querySelector('#feedback-icon-container');
                const textContainer = loaderOverlay.querySelector('#feedback-text-container');
                if(iconContainer) iconContainer.innerHTML = '';
                if(textContainer) textContainer.textContent = '';
                loaderOverlay.classList.remove('success', 'duplicate');
                loaderOverlay.classList.add('show', 'loading');
            }

            const topico = document.getElementById('custom-topico-select').getAttribute('data-selected-value');
            const localCursoGroup = document.getElementById('local-curso-group');
            let to_email = siteData.responsibleEmails[topico] || 'rcpereiracruz@gmail.com';

            let local_curso = "N/A";
            if (localCursoGroup.style.display === 'block') {
                local_curso = document.getElementById('custom-local-select').getAttribute('data-selected-value') || "Não selecionado";
                if (siteData.responsibleEmails[topico] && siteData.responsibleEmails[topico][local_curso]) {
                    to_email = siteData.responsibleEmails[topico][local_curso];
                }
            }

            const templateParams = {
                to_email: to_email,
                from_name: document.getElementById('nome-contato').value,
                from_email: document.getElementById('email-contato').value,
                telefone: document.getElementById('telefone-contato').value,
                motivo: document.getElementById('custom-motivo-select').getAttribute('data-selected-value'),
                topico: topico,
                local_curso: local_curso,
                message: document.getElementById('mensagem').value,
            };

            emailjs.send('service_arqthfw', 'template_5c9blkj', templateParams)
                .then(() => {
                   if (loaderOverlay) {
                       loaderOverlay.classList.remove('loading');
                       loaderOverlay.classList.add('success');

                       const successIconSVG = `<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="circle" cx="26" cy="26" r="23" fill="none"/><path class="check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>`;
                       const iconContainer = loaderOverlay.querySelector('#feedback-icon-container');
                       const textContainer = loaderOverlay.querySelector('#feedback-text-container');

                       if(iconContainer) iconContainer.innerHTML = successIconSVG;
                       if(textContainer) textContainer.textContent = "Mensagem enviada com sucesso!";
                   }
                   setTimeout(() => {
                       location.reload();
                   }, 4000);
                }, (error) => {
                   if (loaderOverlay) {
                       loaderOverlay.classList.remove('show', 'loading');
                   }
                   if (formStatus) {
                       formStatus.textContent = 'Ocorreu um erro ao enviar a mensagem. Tente novamente.';
                       formStatus.style.display = 'block';
                   }
                   console.log('FALHA NO ENVIO...', error);
                });
        });
    }

    function setupRegistrationForm() {
        const form = document.getElementById('registration-form');
        if (!form) return;

        const successIconSVG = `<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="circle" cx="26" cy="26" r="23" fill="none"/><path class="check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>`;
        const duplicateIconSVG = `<svg class="duplicate-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="circle-error" cx="26" cy="26" r="23" fill="none"/><path class="cross-1" fill="none" d="M16 16 36 36"/><path class="cross-2" fill="none" d="M36 16 16 36"/></svg>`;

        const fields = {
            nome: { input: form['nome-completo'], error: document.getElementById('nome-error') },
            email: { input: form['email-inscricao'], error: document.getElementById('email-error-inscricao') },
            telefone: { input: form['telefone-inscricao'], error: document.getElementById('telefone-error') },
            igreja: { wrapper: document.getElementById('custom-igreja-select'), error: document.getElementById('igreja-error') },
            classe: { wrapper: document.getElementById('custom-classe-select'), error: document.getElementById('classe-error') },
            instrumento: { wrapper: document.getElementById('custom-instrumento-select'), error: document.getElementById('instrumento-error') },
            local: { wrapper: document.getElementById('custom-local-inscricao-select'), error: document.getElementById('local-error') },
            possuiInstrumento: { wrapper: document.getElementById('custom-possui-instrumento-select'), error: document.getElementById('possui-instrumento-error') },
            ciencia: { input: form['ciencia-teoria'], error: document.getElementById('ciencia-error') }
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function updateFormVisibility(selectedInstrumento) {
            const possuiInstrumentoGroup = document.getElementById('possui-instrumento-group');
            const localGroup = document.getElementById('local-curso-inscricao-group');
            const localSelect = document.getElementById('custom-local-inscricao-select');

            if (possuiInstrumentoGroup) possuiInstrumentoGroup.style.display = 'none';
            if (localGroup) localGroup.style.display = 'none';
            if (localSelect) {
                localSelect.removeAttribute('data-selected-value');
                const triggerText = localSelect.querySelector('.custom-select-trigger span');
                if (triggerText) triggerText.textContent = 'Selecione o local';
            }

            if (!selectedInstrumento) return;

            const needsInstrument = selectedInstrumento !== 'Teoria Musical' && selectedInstrumento !== 'Canto Coral';
            if (possuiInstrumentoGroup) {
                possuiInstrumentoGroup.style.display = needsInstrument ? 'block' : 'none';
            }

            const curso = siteData.courses.find(c => c.name === selectedInstrumento);
            if (!curso || !curso.locations) return;

            const availableLocations = curso.locations;

            if (availableLocations.length > 0) {
                const locationNames = availableLocations.map(loc => loc.local);
                populateSelect('custom-local-inscricao-select', locationNames);
                if (localGroup) localGroup.style.display = 'block';
            }
        }

        function validateField(field, name) {
            let isValid = true;
            let errorMessage = '';
            if (!field || (!field.input && !field.wrapper)) return true;

            const targetElement = field.input || field.wrapper.querySelector('.custom-select-trigger');
            if (field.input) {
                if (field.input.type === 'checkbox') { if (!field.input.checked) { isValid = false; errorMessage = 'Você precisa estar ciente para se inscrever.'; } }
                else {
                    const value = field.input.value.trim();
                    if (value === '') { isValid = false; errorMessage = 'Este campo é obrigatório.'; }
                    else if (name === 'nome' && value.split(' ').filter(n => n).length < 2) { isValid = false; errorMessage = 'Por favor, insira seu nome completo.'; }
                    else if (name === 'email' && !emailRegex.test(value)) { isValid = false; errorMessage = 'Por favor, insira um e-mail válido.'; }
                }
            } else if (field.wrapper) {
                const parentGroup = field.wrapper.closest('.form-group');
                if (parentGroup && window.getComputedStyle(parentGroup).display !== 'none') {
                    if (!field.wrapper.getAttribute('data-selected-value')) { isValid = false; errorMessage = 'Por favor, selecione uma opção.'; }
                }
            }

            if (field.error) {
                field.error.textContent = errorMessage;
                field.error.style.display = isValid ? 'none' : 'block';
            }
            if(targetElement) targetElement.classList.toggle('invalid', !isValid);

            return isValid;
        }

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            if (field && field.input) { field.input.addEventListener('blur', () => { validateField(field, fieldName); }); }
        });

        if (fields.telefone.input) {
            fields.telefone.input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '').substring(0, 11);
                if (value.length > 10) { value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); }
                else if (value.length > 6) { value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3'); }
                else if (value.length > 2) { value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2'); }
                e.target.value = value;
            });
        }

        const bairros = [
            "Alto da Terezinha", "Alto de Coutos", "Bairro Novo", "Boca do Rio", "Brotas",
            "Campinas de Pirajá", "Cidade Baixa", "Cidade Nova", "Fazenda Coutos", "Fazenda Grande",
            "Garcia", "Guarani", "Iapi", "Itaigara", "Itapuã I", "Itapuã II", "Jardim Terra Nova",
            "Jardim Valéria", "Lobato", "Luiz Alselmo", "Mirantes de Periperi", "Pero Vaz",
            "Pituba", "São Cristovão", "São Marcos", "Vista Alegre"
        ].sort();

        populateSelect('custom-igreja-select', bairros, true);
        populateSelect('custom-classe-select', ["Intermediário", "Adolescente", "Jovem", "Senhora", "Varão"], true);
        populateSelect('custom-instrumento-select', siteData.courses.map(c => c.name), true);
        populateSelect('custom-possui-instrumento-select', ["Sim, é meu próprio", "Não possuo", "Sim, mas é emprestado"]);

        setupCustomSelect('custom-igreja-select', () => validateField(fields.igreja));
        setupCustomSelect('custom-classe-select', () => validateField(fields.classe));
        setupCustomSelect('custom-instrumento-select', (selectedInstrument) => {
            updateFormVisibility(selectedInstrument);
            validateField(fields.instrumento);
        });
        setupCustomSelect('custom-possui-instrumento-select', () => validateField(fields.possuiInstrumento));
        setupCustomSelect('custom-local-inscricao-select', () => validateField(fields.local));

        form.querySelectorAll('input[name="tem-experiencia"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                document.getElementById('experiencia-group').style.display = e.target.value === 'Sim' ? 'block' : 'none';
            });
        });

        updateFormVisibility(null);

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (!Object.keys(fields).every(name => validateField(fields[name], name))) return;

            const loaderOverlay = document.getElementById('form-loader-inscricao');
            const iconContainer = loaderOverlay.querySelector('#feedback-icon-container');
            const textContainer = loaderOverlay.querySelector('#feedback-text-container');

            loaderOverlay.classList.remove('success', 'duplicate');
            iconContainer.innerHTML = ''; textContainer.textContent = '';
            loaderOverlay.classList.add('show', 'loading');

            const scriptURL = 'https://script.google.com/macros/s/AKfycbwr2FcV-8pZnR7_Of3CQ0E4-QKE8v8Gn02M-HM5EYyB8DLbYkPLWXPJ9DBS8SXbCG9Wbg/exec';

            const formData = new FormData(form);

            formData.set('igreja', fields.igreja.wrapper.getAttribute('data-selected-value') || "");
            formData.set('classe', fields.classe.wrapper.getAttribute('data-selected-value') || "");
            formData.set('instrumento', fields.instrumento.wrapper.getAttribute('data-selected-value') || "");
            formData.set('local', fields.local.wrapper.getAttribute('data-selected-value') || "N/A");
            formData.set('possui-instrumento', fields.possuiInstrumento.wrapper.getAttribute('data-selected-value') || "N/A");

            fetch(scriptURL, { method: 'POST', body: formData})
                .then(response => response.json())
                .then(data => {
                    loaderOverlay.classList.remove('loading');
                    if (data.result === 'success') {
                        iconContainer.innerHTML = successIconSVG;
                        textContainer.textContent = "Inscrição enviada com sucesso!";
                        loaderOverlay.classList.add('success');
                        setTimeout(() => {
                            loaderOverlay.classList.remove('show', 'success');
                            form.reset();
                            document.querySelectorAll('#registration-form .custom-select-wrapper').forEach(wrapper => {
                                const triggerText = wrapper.querySelector('.custom-select-trigger span');
                                const placeholderMap = {
                                    'custom-igreja-select': 'Selecione a igreja',
                                    'custom-classe-select': 'Selecione sua classe',
                                    'custom-instrumento-select': 'Selecione o instrumento',
                                    'custom-local-inscricao-select': 'Selecione o local',
                                    'custom-possui-instrumento-select': 'Selecione uma opção'
                                };
                                triggerText.textContent = placeholderMap[wrapper.id] || 'Selecione';
                                wrapper.removeAttribute('data-selected-value');
                            });
                            document.getElementById('experiencia-group').style.display = 'none';
                            updateFormVisibility(null);
                        }, 4000);
                    } else if (data.result === 'duplicate_course' || data.result === 'limit_reached') {
                        iconContainer.innerHTML = duplicateIconSVG;
                        textContainer.textContent = data.message;
                        loaderOverlay.classList.add('duplicate');
                        const timeout = data.result === 'limit_reached' ? 5000 : 4000;
                        setTimeout(() => loaderOverlay.classList.remove('show', 'duplicate'), timeout);
                    } else {
                        throw new Error(data.message || 'Ocorreu um erro desconhecido.');
                    }
                })
                                .catch(error => {
                    console.error('Error!', error);
                    loaderOverlay.classList.remove('loading');
                    loaderOverlay.classList.add('duplicate'); // Reutiliza o estilo de erro

                    const iconContainer = loaderOverlay.querySelector('#feedback-icon-container');
                    const textContainer = loaderOverlay.querySelector('#feedback-text-container');
                    
                    // Adiciona o ícone de erro e a mensagem
                    if (iconContainer) iconContainer.innerHTML = duplicateIconSVG; // Reutiliza o ícone de 'duplicado' para erro
                    if (textContainer) textContainer.textContent = 'Ocorreu um erro. Tente novamente.';

                    // Mantém a mensagem de erro visível por alguns segundos
                    setTimeout(() => {
                        loaderOverlay.classList.remove('show', 'duplicate');
                    }, 5000); // Aumenta o tempo para 5 segundos
                });
        });
    }

    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }

    // --- INICIALIZAÇÃO ---
    setupMobileMenu();
    setupScheduleSection();
    setupDownloadsSection();
    setupContactForm();
    setupRegistrationForm();
    setupScrollAnimations();
    setupSlider('testimonial-slider-container', 'testimonial-slides', 'depoimento-prev', 'depoimento-next');

    window.addEventListener('click', () => {
        document.querySelectorAll('.custom-select-wrapper.is-open').forEach(select => {
            select.classList.remove('is-open');
        });
    });
});