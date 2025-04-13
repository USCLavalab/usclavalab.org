const roles: Record<string, { who: string; what: string }> = {
  "Product Manager": {
    who: "You see challenges as opportunities and have a knack for turning insights into products that make a real impact. At LavaLab, you’re both a leader and a pragmatic problem-solver—someone who crafts solutions that truly resonate with users.",
    what: "You’ll take charge of your product roadmap, collaborating closely with designers and developers to transform market insights into clear, actionable plans. By setting priorities and continuously iterating, you'll ensure your product delivers genuine value and meets the evolving needs of your customers.",
  },
  Designer: {
    who: "You have a passion for crafting visual experiences. You are empathetic and able to put yourself in the user’s shoes. Your need to learn causes you to push your design skills and your attention to detail and ability to execute helps you bring your ideas to the next level.",
    what: "Designing the MVP for your team’s product includes the branding, user experience, and marketing materials. Conceptualize the best way to solve your user’s problem creatively. Coming together with your PM and developers to brainstorm the problem you want to solve and how to address it.",
  },
  Developer: {
    who: "You are a builder at heart, and love developing solutions to problems. No challenge is insurmountable for you, and you’re willing and able to teach yourself unknown concepts. You’re ready to put in the work with late nights and constant iteration.",
    what: "You’ll be working with a fellow developer on your team to build a fully-fledged product by the end of a semester. Together with your PM and designer, you’ll brainstorm the problem you want to solve and how to best address it. Throughout the semester, prepare to dev out multiple iterations of MVPs to perfect your solution.",
  },
};

export default roles;
