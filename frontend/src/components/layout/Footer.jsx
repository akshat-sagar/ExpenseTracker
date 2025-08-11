// src/components/layout/Footer.jsx

const Footer = () => {
    return (
        <footer className="px-6 py-12 bg-white text-sm text-gray-600 border-t">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold">T</div>
                        <span className="font-semibold text-gray-900">TruPath</span>
                    </div>
                    <p>Your money, your control.</p>
                </div>
                {[
                    { title: 'Features', items: ['Templates', 'How it Works', 'Pricing'] },
                    { title: 'Resources', items: ['Help Center', 'Blog', 'Guides'] },
                    { title: 'Company', items: ['About Us', 'Careers', 'Contact'] }
                ].map(section => (
                    <div key={section.title}>
                        <h4 className="font-semibold text-gray-900 mb-2">{section.title}</h4>
                        <ul className="space-y-1">
                            {section.items.map(item => (
                                <li key={item}>
                                    <a href="#" className="hover:text-gray-900">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t pt-6">
                <div className="flex space-x-4 mb-2 md:mb-0">
                    <a href="#" className="hover:text-gray-900">Privacy</a>
                    <a href="#" className="hover:text-gray-900">Terms</a>
                    <a href="#" className="hover:text-gray-900">Cookies</a>
                </div>
                <p>©2025 TruPath. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
